import { html } from '../../node_modules/lit-html/lit-html.js';


//TODO Replace with actual layout
//layout shows content and shows if user is logged 
export const layoutTemplate = (userData, content) => html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto">
        ${userData ? html`
            <li class="nav-item user">
                <a class="nav-link" id="welcome-msg">Welcome, ${userData.email}</a>
            </li>
            <li class="nav-item user">
                <a class="nav-link" href="/logout">Logout</a>
            </li>` : html`
            <li class="nav-item guest">
                <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item guest">
                <a class="nav-link" href="/register">Register</a>
            </li>`}
        </ul>
    </nav>
    <main>
        ${content}
    </main>
    <footer class="page-footer font-small">
        <div class="footer-copyright text-center py-3">
            &copy; 2020
            <a href="#" class="text-dark">JS Applications</a>
        </div>
    </footer>`;

// html`
// <nav>
//     <a href="/">Home</a>
//     ${userData ? html`
//     <a href="/logout">Logout</a>` : html`
//     <a href="/login">Login</a>
//     <a href="/register">Register</a>`}
// </nav>
// <main>
//     ${content}
// </main>`;





