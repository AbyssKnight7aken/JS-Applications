import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


//TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requirements
    async function onRegister({email, password, repass}, form) {

        const repassword =  document.querySelector('#repeat-password').value;
        console.log(password, repassword);

        if (email == '', password == '') {
            return alert('All fields are required');
        }
        
        if (password != repassword) {
            return alert('Passwords don\'t match');
        }

        await register(email, password);
        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}


// <!-- <h1>Register Page</h1>
// <form @submit=${onRegister}>
//     <label>Email: <input type="text" name="email"></label>
//     <label>Password: <input type="password" name="password"></label>
//     <label>Repeat Password: <input type="password" name="repass"></label>
//     <button>Register</button>
// </form> -->