import { describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '../../test/utils'
import FetchExample from './FetchExample.vue'

describe('<FetchExample />', () => {
  const message = 'Hello, from This Dot Labs!'
  test('Should display correct message', async () => {
    vi.stubGlobal('useLazyFetch', vi.fn().mockReturnValue({
      data: message
    }))

    render(FetchExample)

    // Assertions
    await waitFor(() => {
      const messageValue = screen.getByTestId('message-value')
      expect(messageValue.textContent).toBe(message)
    })
  })
})
