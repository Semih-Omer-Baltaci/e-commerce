// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Switch>
            <Route exact path="/" render={() => <div>Home Page</div>} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/shop" render={() => <div>Shop Page</div>} />
            <Route path="/categories" render={() => <div>Categories Page</div>} />
            <Route path="/about" render={() => <div>About Page</div>} />
            <Route path="/contact" render={() => <div>Contact Page</div>} />
            <Route path="/cart" render={() => <div>Cart Page</div>} />
            <Route path="/account" render={() => <div>Account Page</div>} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;