import * as api from './data/auth.js';
import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { movieInfoPage } from '../src/views/movieInfo.js';
import { editMoviePage } from '../src/views/editMovie.js';
import { createPage } from '../src/views/create.js';

//window.api = api;

//TODO change render root depending on project HTML struncture
const root = document.getElementById('container');

page(decorateContext); //global middleware
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/movieInfo/:id', movieInfoPage);
page('/editMovie/:id', editMoviePage);
page('/addMovie', createPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

//TODO Inject dependencies
function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
    api.logout();
    ctx.page.redirect('/');
}