const openTeamModalLink = document.querySelector("js-team-modal");
const modalTeam = document.querySelector("[data-team-modal]");
const closeModalTeamBtn = document.querySelector("team-modal__close-btn")

openTeamModalLink.addEventListener("click", openTeamModal);
closeModalTeamBtn.addEventListener("click", openTeamModal);

function openTeamModal (){
    modalTeam.classList.toggle("is-hidden");
}