import { render, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../src/App'
import { test, expect, vi } from 'vitest'

vi.mock('../src/api/rarible.api', () => {
  const original = vi.importActual('../src/api/rarible.api')
  return {
    ...original,
    raribleApi: {
      getNftOwnerships: vi.fn().mockResolvedValue({ items: [{ tokenId: '123' }] }),
      getNftTraitsRarity: vi.fn().mockResolvedValue({ rarity: 'high' }),
    },
  }
})

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

test('shows error message when collectionId is empty', async () => {
  const { container } = renderWithClient(<App />)

  const input = container.querySelector('input.w-full.p-2.border.rounded')
  if (!input) throw new Error('Input not found')

  const button = container.querySelector('button.bg-blue-500')
  if (!button) throw new Error('Button not found')

  fireEvent.change(input, { target: { value: '' } })
  fireEvent.click(button)

  const errorMessage = container.querySelector("div.text-red-600.text-sm")
  expect(errorMessage?.textContent).toBe("Collection ID is required")
})

test('returns data when collectionId is not empty', async () => {
  const { container } = renderWithClient(<App />)

  const input = container.querySelector('input.w-full.p-2.border.rounded')
  if (!input) throw new Error('Input not found')

  const button = container.querySelector('button.bg-blue-500')
  if (!button) throw new Error('Button not found')

  fireEvent.change(input, { target: { value: 'id' } })
  fireEvent.click(button)

  await waitFor(() => {
    const errorDiv = container.querySelector("div.text-red-600.text-sm")
    expect(errorDiv?.textContent).toBeFalsy()
  })

  await waitFor(() => {
    const content = document.querySelector('pre')
    expect(content?.textContent).toBeTruthy()
  })
})

test('returns rarity data when collectionId and properties are valid', async () => {
  const { container } = renderWithClient(<App />)

  const collectionInput = container.querySelector('input.w-full.p-2.border.rounded')
  if (!collectionInput) throw new Error('Collection ID input not found')

  const keyInput = container.querySelector('input[placeholder="key"]')
  const valueInput = container.querySelector('input[placeholder="value"]')
  if (!keyInput || !valueInput) throw new Error('Property inputs not found')

  const rarityButton = container.querySelector(".bg-green-600")
  if (!rarityButton) throw new Error('Get Rarity button not found')

  fireEvent.change(collectionInput, { target: { value: 'test-collection' } })
  fireEvent.change(keyInput, { target: { value: 'color' } })
  fireEvent.change(valueInput, { target: { value: 'blue' } })
  fireEvent.click(rarityButton)

  await waitFor(() => {
    const content = container.querySelector('div')
    if (!content) throw new Error('Result content not rendered')
    expect(content.textContent?.toLowerCase()).toContain('rarities data')
  })

  await waitFor(() => {
    const pre = container.querySelector('pre')
    expect(pre?.textContent).toContain('"rarity"')
  })
})

test('does not return rarity data when properties are empty', async () => {
  const { container } = renderWithClient(<App />)

  const collectionInput = container.querySelector('input.w-full.p-2.border.rounded')
  if (!collectionInput) throw new Error('Collection ID input not found')

  const keyInput = container.querySelector('input[placeholder="key"]')
  const valueInput = container.querySelector('input[placeholder="value"]')
  if (!keyInput || !valueInput) throw new Error('Property inputs not found')

  const rarityButton = container.querySelector('.bg-green-600')
  if (!rarityButton) throw new Error('Get Rarity button not found')

  fireEvent.change(collectionInput, { target: { value: 'test-collection' } })
  fireEvent.change(keyInput, { target: { value: '' } })
  fireEvent.change(valueInput, { target: { value: '' } })
  fireEvent.click(rarityButton)

  await waitFor(() => {
    const pre = container.querySelector('pre')
    expect(pre?.textContent).toBeFalsy()
  })

  await waitFor(() => {
    const errorDiv = container.querySelector("div.text-red-600.text-sm")
    expect(errorDiv?.textContent).toBe("Collection ID and valid properties are required")
  })  
})
