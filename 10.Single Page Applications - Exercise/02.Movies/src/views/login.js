import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


const root = document.querySelector('#container');
//TODO Replace with actual view
const loginTemplate = (onLogin) => html`
<section id="form-login" class="view-section">
        <form @submit=${onLogin} id="login-form" class="text-center border border-light p-5" action="" method="">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              value=""
            />
          </div>

          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    //TODO change user object based on requirements
    async function onLogin({email, password}, form) {
        await login(email, password);
        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}





{/* <h1>Login Page</h1>
<form @submit=${onLogin}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <button>Login</button>
</form>`; */}