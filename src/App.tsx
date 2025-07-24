import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NftPage } from './pages/nft-page/nft-page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NftPage />
    </QueryClientProvider>
  )
}

export default App
