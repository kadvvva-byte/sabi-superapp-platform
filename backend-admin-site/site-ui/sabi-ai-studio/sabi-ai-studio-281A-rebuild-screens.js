
(function(){
  function goHome(){
    window.location.href = "./index.html";
  }

  document.addEventListener("click", function(event){
    var back = event.target.closest("[data-sabi281-back]");
    if (back) {
      event.preventDefault();
      if (window.history.length > 1) window.history.back();
      else goHome();
      return;
    }

    var plan = event.target.closest("[data-sabi281-plan]");
    if (plan) {
      event.preventDefault();
      document.querySelectorAll("[data-sabi281-plan]").forEach(function(el){
        el.classList.remove("is-selected");
        el.setAttribute("aria-checked","false");
      });
      plan.classList.add("is-selected");
      plan.setAttribute("aria-checked","true");
      var id = plan.getAttribute("data-plan-id") || "free-trial";
      var label = plan.querySelector("h3") ? plan.querySelector("h3").textContent.trim() : id;
      document.querySelectorAll("[data-sabi281-selected-plan]").forEach(function(el){
        el.textContent = id;
      });
      try { localStorage.setItem("sabi:selectedPlan", id); } catch(e) {}
      return;
    }

    var pay = event.target.closest("[data-sabi281-payment]");
    if (pay) {
      event.preventDefault();
      alert("Payment is locked until Owner approval and live provider connection.");
    }
  });
})();

