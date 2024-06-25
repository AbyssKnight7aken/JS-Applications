import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

// TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="register-page" class="register">
    <form @submit=${onRegister} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    // TODO change user object based on requirements
    async function onRegister({ email, password, ['confirm-pass']: repass }, form) {
        if (email == '' || password == '') {
            return alert('All fields are required');
        }
        if (password != repass) {
            return alert('Passwords don\`t match');
        }
        await register(email, password);
        form.reset();
        // TODO use redicrect location from requirements
        ctx.page.redirect('/');
    }
}
