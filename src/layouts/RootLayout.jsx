import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[99px]"> {/* Added padding-top to account for fixed header */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
