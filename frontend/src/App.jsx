import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import { UiProvider } from './contexts/UiContext'
import { ModalProvider } from './contexts/ModalContext'
import { Toaster } from 'react-hot-toast'
import Home from './Home'
import ProductOverviewPage from './pages/app/ProductOverviewPage'
import Test from './Test'
import Signup from './pages/authentication/Signup'
import Login from './pages/authentication/Login'
import ForgotPassword from './pages/authentication/ForgotPassword'
import VerificationScreen from './pages/authentication/VerificationScreen'
import AuthLayout from './pages/Layout/AuthLayout'
import ResetPassword from './pages/authentication/ResetPassword'
import MySlider from './components/ui/Slider'
import ProductListingPage from './pages/app/ProductListingPage'
import AppLayout from './pages/Layout/AppLayout'
import CheckoutForm from './components/ui/order/CheckoutForm'
import Return from './components/ui/order/Return'
import NoOrderYetPage from './components/ui/NoOrderYetPage'
import PaymentSuccesful from './components/ui/order/PaymentSuccesful'
import OrderArrived from './components/ui/order/OrderArrived'
import PaymentPage from './components/ui/order/PaymentPage'
import PageNotFound from './pages/app/PageNotFound'
import ProfilePage from './pages/app/ProfilePage'
import MyWallet from './components/account/MyWallet'
import Myprofile from './components/account/Myprofile'
import MyAddresses from './components/account/MyAddresses'
import Faqs from './components/account/Faqs'
import OrderList from './components/account/OrderList'
import FaqsQuestions from './components/account/FaqsQuestions'
import FaqQuestionAnswers from './components/account/FaqQuestionAnswers'
import OrderOverview from './components/account/OrderOverview'
import SearchPage from './pages/app/SearchPage'
import Modal from './components/ui/Modal'
import SelectAddressFromOptions from './components/address/SelectAddressFromOptions';
import AddAddress from './components/address/AddAddress'
import TestModals from './TestModals'
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from '@stripe/stripe-js'
// const stripePromise = loadStripe("pk_test_51PCPQ7SCYNwOSRdPc9vhilWWao77cM8GPqMMUmsj2TPitKFjkti2tziamGnuzp0xhP5oUlnoGG8SEQ1ogWxDgVDL00sC7bA33g");


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
        <Router>
      <AuthProvider>
      <ModalProvider>
      <UiProvider>
        
     
    
          <Routes>
          {/* <Route path="/checkout" element={
            <Elements stripe={stripePromise}>
              
          <CheckoutForm />
            </Elements>
          } /> */}
          
          
          {/* <Route path="*" element={<PageNotFound/>} />
          <Route path="s" element={<SearchPage/>} />
          <Route path="search" element={<SearchPage/>} />
          <Route path="x" element={<NoOrderYetPage/>} />
          <Route path="noorderfound" element={<NoOrderYetPage/>} />
          <Route path="/checkout" element={<PaymentPage/>} />
          <Route path="/stripe-checkout" element={<CheckoutForm />} />
          <Route path="/p" element={<PaymentSuccesful />} />
          <Route path="/o" element={<OrderArrived/>} />
          <Route path="/order/status/arrived" element={<OrderArrived/>} />
          {/* <Route path="/order" element={<OrderArrived/>} /> */}
          {/* <Route path="/return" element={<Return />} /> */}
          {/* <Route path="/return/:sessionId" element={<Return />} /> */}
            {/* <Route path="/test" element={<Test />} /> */} 
            {/* */}
            <Route path="" element={<AppLayout />} >
            <Route path="/modal" element={<Modal />} />
            <Route path="/testModal" element={<TestModals />} />
            <Route path="/saf" element={<SelectAddressFromOptions/>} />
            <Route path="/address" element={<AddAddress/>} />
            <Route path="/map" element={<AddAddress/>} />
              
              <Route path='/account' element={<ProfilePage/>}>
                <Route path='' index element={<Navigate to="/account/orders" />}/>
                <Route path='/account/orders' element={<OrderList/>}/>
                <Route path='/account/order/:orderId' element={<OrderOverview/>}/>
                <Route path='/account/addresses' element={<MyAddresses/>}/>
                <Route path='/account/profile' element={<Myprofile/>}/>
                <Route path='/account/wallet' element={<MyWallet/>}/>
                <Route path='/account/support' element={<Faqs/>}/>
                <Route path='/account/support/:faqCategoryId' element={<FaqsQuestions/>}/>
                <Route path='/account/support/:faqCategoryId/details/:faqQuestionID' element={<FaqQuestionAnswers/>}/>
               </Route>
              
              
               <Route path="*" element={<PageNotFound/>} />
          <Route path="s" element={<SearchPage/>} />
          <Route path="search" element={<SearchPage/>} />
          <Route path="x" element={<NoOrderYetPage/>} />
          <Route path="noorderfound" element={<NoOrderYetPage/>} />
          <Route path="/checkout" element={<PaymentPage/>} />
          <Route path="/stripe-checkout" element={<CheckoutForm />} />
          <Route path="/p" element={<PaymentSuccesful />} />
          <Route path="/o" element={<OrderArrived/>} />
          <Route path="/order/status/arrived" element={<OrderArrived/>} />
          {/* <Route path="/order" element={<OrderArrived/>} /> */}
          <Route path="/return" element={<Return />} />
          {/* <Route path="/return/:sessionId" element={<Return />} /> */}
            <Route path="/test" element={<Test />} />
              
              
              
              
              
              
              
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="cn/:categoryName/:subcategoryName/cid/:categoryId/scid/:subcategoryId" element={<ProductListingPage/>}></Route>
            <Route path="pn/:productName/pvid/:productId" element={<ProductOverviewPage/>}></Route>
            <Route path=''></Route>
            </Route>
            {/* <Route path="/home" element={<Home />} /> FIXME */}
            {/* <Route path="/product-overview" element={<ProductOverviewPage/>}></Route> */}
            {/* <Route path="/products" element={<ProductListingPage/>}></Route> */}
            {/* <Route path="products/:id" element={<ProductOverviewPage/>}></Route> */}
            {/* <Route path="cn/:categoryName/:subcategoryName/cid/:categoryId/scid/:subcategoryId" element={<ProductListingPage/>}></Route>
            <Route path="pn/:productName/pvid/:productId" element={<ProductOverviewPage/>}></Route> */}
            <Route path="/slider" element={<MySlider />} />
            <Route path="" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signup/mail-verification" element={<VerificationScreen />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
            </Route>
          </Routes>
          </UiProvider>
          </ModalProvider>
      </AuthProvider>
        </Router>
    </QueryClientProvider>
  );
}

export default App;
































































































































// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import Signup from './pages/authentication/Signup'
// import Login from './pages/authentication/Login'
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
// import { AuthProvider } from './AuthContext'
// import { Toaster } from 'react-hot-toast'
// import Home from './Home'
// import ForgotPassword from './pages/authentication/ForgotPassword'
// import VerificationScreen from './pages/authentication/VerificationScreen'
// import AuthLayout from './pages/Layout/AuthLayout'


// const queryClient=new QueryClient({
//   defaultOptions:{
//     queries:{
//       staleTime:0
//     }
//   }
// });

// function App() {
  
//   const router = createBrowserRouter([
//     {
//       path:"/home",
//       element:<Home/>
//       // element:
//     },
//     {
//       path:'',
//       element:<AuthLayout/>,
      
//       children:[
//         {
//           path:"/login",
//           element:<Login/>,
          
//         },
//         {
//           path:'/signup',
//           element:<Signup/>
//         },{
//           path:'/signup/mail-verification',
//           element:<VerificationScreen/>
//         },{
//           path:"/forgot-password",
//           element:<ForgotPassword/>
//         }
//       ]
//     },
//   ])
  

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false}/>
//     <Toaster/>
//     <AuthProvider>
        
//       <RouterProvider router={router}>
//         </RouterProvider>
      
//     </AuthProvider>
//     </QueryClientProvider>
    
//   )
// }

// export default App
