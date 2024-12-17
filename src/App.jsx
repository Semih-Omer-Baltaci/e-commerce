// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16">
            <Switch>
              <Route exact path="/" component={() => <div>Home Page</div>} />
              <Route path="/signup" component={SignupForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/shop" component={() => <div>Shop Page</div>} />
              <Route path="/categories" component={() => <div>Categories Page</div>} />
              <Route path="/about" component={() => <div>About Page</div>} />
              <Route path="/contact" component={() => <div>Contact Page</div>} />
              <Route path="/cart" component={() => <div>Cart Page</div>} />
              <Route path="/account" component={() => <div>Account Page</div>} />
            </Switch>
          </main>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;