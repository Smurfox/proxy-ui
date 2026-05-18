export interface PopoverGroup {
  open: (close: () => void) => void
  release: (close: () => void) => void
}

export function createPopoverGroup(): PopoverGroup {
  let activeClose: (() => void) | null = null
  return {
    open(close) {
      if (activeClose && activeClose !== close) activeClose()
      activeClose = close
    },
    release(close) {
      if (activeClose === close) activeClose = null
    },
  }
}
