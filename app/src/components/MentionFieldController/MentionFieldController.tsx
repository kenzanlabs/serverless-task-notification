import Downshift, { ControllerStateAndHelpers, DownshiftProps } from 'downshift'
import * as React from 'react'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'
import getCaretCoordinates from 'textarea-caret'

type RemoveItem<T> = (item: T, callback?: () => void) => void

export interface CaretPosition {
  top: number
  left: number
  height: number
}

interface ProvidedState<T> extends ControllerStateAndHelpers<T> {
  selectedItems: T[]
  removeItem: RemoveItem<T>
  mentionSearch: string
  menuPosition: CaretPosition
}

type ChildrenFunction<T> = (options: ProvidedState<T>) => React.ReactNode

type ChangeCallback<T> = (
  selectedItems: T[],
  stateAndHelpers: ProvidedState<T>,
) => void

interface Props<T>
  extends Pick<
      DownshiftProps<T>,
      Exclude<keyof DownshiftProps<T>, 'onChange' | 'onSelect' | 'children'>
    > {
  children: ChildrenFunction<T>
  onChange?: ChangeCallback<T>
  onSelect?: ChangeCallback<T>
}

interface State<T> {
  selectedItems: T[]
  inputValue: string
  mentionStartAnchor: number | null
}

const initState = <T extends {}>(): State<T> => ({
  selectedItems: [],
  inputValue: '',
  mentionStartAnchor: null,
})

class MentionFieldController<T> extends React.Component<Props<T>, State<T>> {
  state = initState<T>()

  handleSelection = (
    selectedItem: T,
    downshift: ControllerStateAndHelpers<T>,
  ) => {
    const callOnChange = () => {
      const { onSelect, onChange } = this.props

      const { selectedItems } = this.state

      if (onSelect) onSelect(selectedItems, this.getStateAndHelpers(downshift))

      if (onChange) onChange(selectedItems, this.getStateAndHelpers(downshift))
    }

    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }

    this.setState(({ mentionStartAnchor, inputValue }) => ({
      mentionStartAnchor: null,
      inputValue:
        inputValue &&
        inputValue.replace(
          /@[^\s@]+/g,
          (match, i) => (i === mentionStartAnchor ? '' : match),
        ),
    }))
  }

  removeItem: RemoveItem<T> = (item, cb) => {
    this.setState(
      ({ selectedItems }) => ({
        selectedItems: selectedItems.filter(i => i !== item),
      }),
      cb,
    )
  }

  addSelectedItem(item: T, cb: () => void) {
    this.setState(
      ({ selectedItems }) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  handleInputChange: ChangeEventHandler<HTMLInputElement> = ev => {
    this.setState({ inputValue: ev.target.value || '' })
  }

  handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = ev => {
    switch (ev.key) {
      case '@': {
        const { selectionStart } = ev.currentTarget
        this.setState(() => ({
          mentionStartAnchor: selectionStart && selectionStart,
        }))
        break
      }
      case ' ':
      case 'Spacebar':
      case 'Escape':
        this.setState(() => ({
          mentionStartAnchor: null,
        }))
        break
    }
  }

  handleOuterClick = () => {
    this.setState(() => ({
      mentionStartAnchor: null,
    }))
  }

  mentionSearch() {
    const { mentionStartAnchor, inputValue } = this.state

    if (inputValue && mentionStartAnchor !== null) {
      const match = inputValue.slice(mentionStartAnchor).match(/^@(\S+)/)
      if (match) return match[1]
    }

    return ''
  }

  menuPosition(downshift: ControllerStateAndHelpers<T>) {
    const { mentionStartAnchor } = this.state

    if (mentionStartAnchor !== null) {
      const input = document.getElementById(downshift.getInputProps().id)

      if (input) return getCaretCoordinates(input, mentionStartAnchor)
    }

    return { height: 0, left: 0, top: 0 }
  }

  enhanceGetInputProps: (
    downshift: ControllerStateAndHelpers<T>,
  ) => ProvidedState<T>['getInputProps'] = ({ getInputProps }) => props =>
    getInputProps({
      ...props,
      onKeyDown: this.handleOnKeyDown,
      onInput: this.handleInputChange,
    })

  reset({ reset }: ControllerStateAndHelpers<T>) {
    return ((...args) => {
      this.setState(initState, () => reset(...args))
    }) as typeof reset
  }

  getStateAndHelpers(
    downshift: ControllerStateAndHelpers<T>,
  ): ProvidedState<T> {
    const { selectedItems } = this.state
    const { removeItem } = this

    return {
      ...downshift,
      removeItem,
      selectedItems,
      mentionSearch: this.mentionSearch(),
      getInputProps: this.enhanceGetInputProps(downshift),
      menuPosition: this.menuPosition(downshift),
      reset: this.reset(downshift),
    }
  }

  render() {
    const { children, onSelect, ...props } = this.props

    return (
      <Downshift
        {...props}
        onChange={this.handleSelection}
        selectedItem={null}
        isOpen={this.state.mentionStartAnchor !== null}
        onOuterClick={this.handleOuterClick}
        inputValue={this.state.inputValue}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}

export default MentionFieldController
