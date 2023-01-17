const teamModalLink = document.querySelector("js-team-modal");
const modalTeam = document.querySelector("[data-modal]");

teamModalLink.addEventListener("click", openTeamModal);

function openTeamModal (){
    modalTeam.classList.toggle("is-hidden");
}