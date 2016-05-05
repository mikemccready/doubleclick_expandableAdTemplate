var isExpanded = false;
var collapsedContainer = document.getElementById('collapsed-panel');
var expandedContainer = document.getElementById('expanded-panel');

// If true, start function. If false, listen for INIT.
window.onload = function() {
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}

// Can be called before the Enabler's INIT event.
Enabler.setStartExpanded(true);
Enabler.setExpandingPixelOffsets(
  0, // left offset of expanded ad
  0, // top offset of expanded ad
  970, // expanded width of ad
  250); // expanded height of ad

function enablerInitHandler() {
  // Start ad, initialize animation,
  startAd();
}

function startAd() {
  actionClickHandler();

}

function expandStartHandler() {
  // Perform expand animation.
  collapsedContainer.style.display = 'none';
  expandedContainer.style.display = 'block';
  Enabler.finishExpand();
}

function expandFinishHandler() {
  isExpanded = true;
}

function collapseStartHandler() {
  // Perform collapse animation.
  collapsedContainer.style.display = 'block';
  expandedContainer.style.display = 'none';
  Enabler.finishCollapse();
}

function collapseFinishHandler() {
  isExpanded = false;
}

function actionClickHandler() {
  isExpanded ? Enabler.requestCollapse() : Enabler.requestExpand();
}

Enabler.addEventListener(
  studio.events.StudioEvent.EXPAND_START,
  expandStartHandler);
Enabler.addEventListener(
  studio.events.StudioEvent.EXPAND_FINISH,
  expandFinishHandler);
Enabler.addEventListener(
  studio.events.StudioEvent.COLLAPSE_START,
  collapseStartHandler);
Enabler.addEventListener(
  studio.events.StudioEvent.COLLAPSE_FINISH,
  collapseFinishHandler);

function bgExitHandler(e) {
  Enabler.exit('Background Exit');
}

document.getElementById('bg-exit').addEventListener('click', bgExitHandler, false);