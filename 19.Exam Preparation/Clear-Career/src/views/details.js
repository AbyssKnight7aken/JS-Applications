import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getItemById, getTotalAppsCount, getHasAppliedForOffer, applyForOffer } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, isOwner, onDelete, applications, showApplyButton, onApply) => html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${offer.imageUrl} alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span
          >${offer.description}</span
        >
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span
          >${offer.requirements}</span
        >
      </div>
    </div>
    <p>Applications: <strong id="applications">${applications}</strong></p>

    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
      ${controlsTemplate(offer, isOwner, onDelete)}
      <!--Bonus - Only for logged-in users ( not authors )-->
      ${applyButtonTemplate(showApplyButton, onApply)}
    </div>
  </div>
</section>
`;

const controlsTemplate = (offer, isOwner, onDelete) => {
  if (isOwner) {
    return html`
      <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    `;
  } else {
    return null;
  }
}

const applyButtonTemplate = (showApplyButton, onApply) => {
  if (showApplyButton) {
    return html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`;
  } else {
    return null;
  }
}

export async function detailsPage(ctx) {
  const offerId = ctx.params.id;
  const offer = await getItemById(offerId);
  const userId = getUserData()?._id;
  const isOwner = offer._ownerId === userId;

  const applications = await getTotalAppsCount(offerId);
  console.log(applications)
  const hasApplied = userId && await getHasAppliedForOffer(offerId, userId);
  let showApplyButton = !isOwner && !hasApplied && userId;
  console.log(showApplyButton);
  ctx.render(detailsTemplate(offer, isOwner, onDelete, applications, showApplyButton, onApply));

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${offer.title}?`)
    if (confirmed) {
      await deleteItem(offerId);
      ctx.page.redirect('/dashboard');
    }
  }

  async function onApply() {
    await applyForOffer(offerId);
    const newApplications = await getTotalAppsCount(offerId);
    showApplyButton = false;
    ctx.render(detailsTemplate(offer, isOwner, onDelete, newApplications, showApplyButton, onApply));
    //ctx.page.redirect(`/details/${offerId}`);
  }
}

