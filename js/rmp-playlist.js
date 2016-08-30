/**
 * @license Copyright (c) 2015-2016 Radiant Media Player 
 * Playlist setup | https://www.radiantmediaplayer.com
 * Terms of service: https://www.radiantmediaplayer.com/terms-of-service.html
 * Contact information: https://www.radiantmediaplayer.com/contact.html
 */
(function (window, document) {

  'use strict';

  // RadiantPlaylist private methods
  // update player ready status
  var _udpateReady = function () {
    this.playerReady = true;
  };

  // destroy has completed - update DOM
  var _destroyCompleted = function (index) {
    this.playerContainer.removeEventListener('destroycompleted', this.destroyCompletedFn);
    var id = this.rmp.id;
    var newPlayerContainer = document.createElement('div');
    this.playlistContainer.replaceChild(newPlayerContainer, this.playerContainer);
    newPlayerContainer.id = id;
    this.playerContainer = newPlayerContainer;
    this.rmp = new RadiantMP(newPlayerContainer.id);
    this.playerContainer.addEventListener('ready', this.udpateReady);
    this.rmp.init(this.playlistItems[index]);
  };

  // update player - destroy player instance, clean DOM and variables
  var _updatePlayer = function (index) {
    this.playerReady = false;
    this.playerContainer.removeEventListener('ready', this.udpateReady);
    //we need to wait first for destroy to complete
    this.destroyCompletedFn = _destroyCompleted.bind(this, index);
    this.playerContainer.addEventListener('destroycompleted', this.destroyCompletedFn);
    this.rmp.destroy();
  };

  // update playlist on click/touchstart
  var _updatePlaylist = function (index, event) {
    if (event) {
      event.stopPropagation();
      if (event.type === 'touchstart') {
        event.preventDefault();
      }
    }
    if (!this.playerReady) {
      return;
    }
    // item already selected, do nothing
    if (this.currentPlaylistItem === index) {
      return;
    }
    this.currentPlaylistItem = index;
    // internal utility to remove class
    for (var i = 0, len = this.playlistItemsDom.length; i < len; i++) {
      this.rmp.fw.removeClass(this.playlistItemsDom[i], 'rmp-pl-line-active');
    }
    this.playlistItemsDom[index].className += ' rmp-pl-line-active';
    this.bottomTitle.textContent = this.playlistItems[index].plTilte;
    var topPosition = this.playlistItemsDom[index].offsetTop;
    if (typeof topPosition === 'number' && this.playlistItemsDom[index].parentNode) {
      this.playlistItemsDom[index].parentNode.scrollTop = topPosition;
    }
    _updatePlayer.call(this, index);
  };

  // next item
  var _nextItem = function (event) {
    if (this.currentPlaylistItem === this.playlistItemsDom.length - 1) {
      _updatePlaylist.call(this, 0, event);
    } else {
      _updatePlaylist.call(this, this.currentPlaylistItem + 1, event);
    }
  };

  // previous item
  var _previousItem = function (event) {
    if (this.currentPlaylistItem === 0) {
      _updatePlaylist.call(this, this.playlistItemsDom.length - 1, event);
    } else {
      _updatePlaylist.call(this, this.currentPlaylistItem - 1, event);
    }
  };

  // setup RadiantPlaylist Class
  // RadiantPlaylist already loaded - abort this cycle
  if (typeof window.RadiantPlaylist !== 'undefined') {
    return;
  }
  // constructor
  window.RadiantPlaylist = function (element, playlistItems) {
    this.element = element;
    this.playlistItems = playlistItems;
  };
  // init public method
  window.RadiantPlaylist.prototype.init = function () {
    this.playerReady = false;
    this.rmp = new RadiantMP(this.element);
    this.udpateReady = _udpateReady.bind(this);
    this.playerContainer = document.getElementById(this.element);
    this.playerContainer.addEventListener('ready', this.udpateReady);

    this.playlistContainer = this.playerContainer.parentNode;
    if (this.playlistContainer === null) {
      console.log('RMP playlist: invalid playlist container');
      return;
    }
    if (!Array.isArray(this.playlistItems) || typeof this.playlistItems[0] !== 'object') {
      console.log('RMP playlist: invalid playlist items');
      return;
    }
    this.currentPlaylistItem = 0;
    var playlistString = '<div class="rmp-pl-container">' +
      '<div class="rmp-pl-items">';
    for (var i = 0, len = this.playlistItems.length; i < len; i++) {
      if (i === 0) {
        playlistString += '<div class="rmp-pl-line rmp-pl-line-active" tabindex="0">';
      } else {
        playlistString += '<div class="rmp-pl-line" tabindex="0">';
      }
      playlistString += '<div class="rmp-pl-number">' +
        (i + 1) + '</div>' +
        '<div class="rmp-pl-thumb"><img src="' +
        this.playlistItems[i].plThumbnailLoc + '"></div>' +
        '<div class="rmp-pl-text"><div class="rmp-pl-title">' +
        this.playlistItems[i].plTilte + '</div>' +
        '<div class="rmp-pl-desc">' + this.playlistItems[i].plDesc +
        '</div></div>' +
        '</div>';
    }
    playlistString += '</div>';
    this.playlistContainer.insertAdjacentHTML('beforeend', playlistString);
    this.playlistItemsDom = this.playlistContainer.getElementsByClassName('rmp-pl-line');
    for (var j = 0, domLength = this.playlistItemsDom.length; j < domLength; j++) {
      if (this.playlistItemsDom[j] !== null) {
        this.playlistItemsDom[j].addEventListener('click', _updatePlaylist.bind(this, j));
      }
    }

    // set up bottom navigation UI
    var bottom = document.createElement('div');
    bottom.className = 'rmp-pl-bottom';

    // previous button
    var previous = document.createElement('span');
    previous.className = 'rmp-pl-previous rmp-i rmp-i-previous';
    previous.addEventListener('click', _previousItem.bind(this));
    bottom.appendChild(previous);

    // add bottom title after previous button
    this.bottomTitle = document.createElement('span');
    this.bottomTitle.className = 'rmp-pl-bottom-title';
    this.bottomTitle.textContent = this.playlistItems[0].plTilte;
    bottom.appendChild(this.bottomTitle);

    // add next button after bottom title
    var next = document.createElement('span');
    next.className = 'rmp-pl-next rmp-i rmp-i-next';
    next.addEventListener('click', _nextItem.bind(this));
    bottom.appendChild(next);

    // append bottom navigation UI
    this.playlistContainer.appendChild(bottom);

    // launch player
    this.rmp.init(this.playlistItems[0]);
  };

})(window, document);