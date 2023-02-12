import { rest } from 'msw'
import axios from 'axios'
import FetchExample from './FetchExample.vue'
import { render, screen, waitFor } from '@/test/utils'
import { mswServer } from '~/test/__mocks__/mswServer'

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

describe('<FetchExample />', () => {

  beforeEach(() => {
    // mock useAsyncLazyData
    jest.mock('~/composables/useAsyncLazyData', () => ({
      useAsyncLazyData: () => ({
        data: {
          message: 'Hello, from This Dot Labs!',
        },
        error: null,
        loading: false,
      }),
    }))
    
  })


  it('Should display correct message', async () => {
    // Arrange
    render(FetchExample, {
      mocks: {
        $nuxt: {
          context: {
            $axios: axios,
          },
        },
      },
      stubs: {
        NuxtLink: true,
      },
    })

    const messageValue = screen.getByTestId('message-value')

    // Assertions
    await waitFor(() => {
      expect(messageValue).toHaveTextContent('Hello, from This Dot Labs!')
    })
  })

  it('Should display error message', async () => {
    mswServer.use(
      rest.get('https://api.starter.dev/.netlify/functions/server/hello', (_, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    // Arrange
    render(FetchExample, {
      mocks: {
        $nuxt: {
          context: {
            $axios: axios,
          },
        },
      },
      stubs: {
        NuxtLink: true,
      },
    })

    const messageValue = screen.getByTestId('message-value')

    // Assertions
    await waitFor(() => {
      expect(messageValue).toHaveTextContent('Error!')
    })
  })
})
