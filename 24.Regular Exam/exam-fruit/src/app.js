import * as api from './data/auth.js';
import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { createPage } from './views/create.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

//window.api = api;

//TODO change render root depending on project HTML struncture
const root = document.querySelector('#wrapper');

page(decorateContext); //global middleware
page('index.html', '/');
page('/', homePage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

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