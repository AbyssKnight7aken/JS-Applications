import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


const root = document.querySelector('#container');
//TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="form-sign-up" class="view-section">
<form
  @submit=${onRegister}
  id="register-form"
  class="text-center border border-light p-5"
  action=""
  method=""
>
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

  <div class="form-group">
    <label for="repeatPassword">Repeat Password</label>
    <input
      id="repeatPassword"
      type="password"
      class="form-control"
      placeholder="Repeat-Password"
      name="repeatPassword"
      value=""
    />
  </div>

  <button type="submit" class="btn btn-primary">Register</button>
</form>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requirements
    async function onRegister({email, password, repeatPassword}, form) {

        console.log(email, password, repeatPassword);

        if (email == '', password == '') {
            return alert('All fields are required');
        }
        
        if (password != repeatPassword) {
            return alert('Passwords don\'t match');
        }

        if(password.length < 6) {
            return alert('The password should be at least 6 characters long!');
        }

        await register(email, password);
        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}





{/* <h1>Register Page</h1>
<form @submit=${onRegister}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat Password: <input type="password" name="repass"></label>
    <button>Register</button>
</form> */}