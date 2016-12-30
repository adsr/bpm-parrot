(function() {
  var type = 'parrot';
  var nframes = 10;
  var curframe = 0;
  var bpm = 114.9;
  var ispixel = 1;
  var isrepeat = 1;
  var timer = null;
  var tap0 = null;
  var tapc = 0;
  var ytid = '-PKV79lug54';
  var dparrot = document.getElementById('parrot');
  var ibpm = document.getElementById('bpm');
  var itype = document.getElementById('type');
  var irepeat = document.getElementById('repeat');
  var ipix = document.getElementById('pixelate');
  var iytid = document.getElementById('ytid');
  var irestart = document.getElementById('restart');
  var ytplayer = null;
  var anim = function() {
    curframe = (curframe + 1) % nframes;
    curf = curframe;
    if (curf < 10) curf = '0' + curframe;
    dparrot.style.backgroundImage = "url('parrots/" + type + ".gif." + curf + ".png')";
  };
  var fromhash = function(h) {
    var parts = h.split(',');
    if (parts.length < 5) return;
    type = parts[0] in types ? parts[0] : 'parrot';
    bpm = parseFloat(parts[1]);
    ispixel = parseInt(parts[2], 10);
    isrepeat = parseInt(parts[3], 10);
    ytid = parts[4];
  };
  var set = function() {
    bpm = Math.ceil(bpm * 10) / 10;
    ibpm.value = bpm;
    if (timer) clearInterval(timer);
    timer = setInterval(anim, 60000.0 / (bpm * nframes));

    if (ispixel) {
      ipix.checked = true;
      dparrot.className = 'pixelated';
    } else {
      ipix.checked = false;
      dparrot.className = '';
    }

    if (isrepeat) {
      irepeat.checked = true;
      dparrot.style.backgroundRepeat = 'repeat';
      dparrot.style.backgroundSize = 'auto';
    } else {
      irepeat.checked = false;
      dparrot.style.backgroundRepeat = 'no-repeat';
      dparrot.style.backgroundSize = '100% 100%';
    }

    iytid.value = ytid;

    var hash = [type, bpm, ispixel ? 1 : 0, isrepeat ? 1 : 0, ytid].join(',');
    history.pushState(null, null, '#' + hash);
  };
  document.onkeypress = function(e) {
    if (e.srcElement == ibpm) {
      return;
    } else if (e.key == 'r') {
      tapc = 0;
    } else if (e.key == 'f') {
      curframe = 0;
    } else {
      var now = (new Date()).getTime();
      if (tapc > 0) {
        bpm = 60000.0 * tapc / (now - tap0);
        set();
      } else {
        tap0 = now;
      }
      tapc += 1;
    }
  };
  ibpm.onchange = function() {
    tapc = 0;
    bpm = parseFloat(this.value);
    set();
  };
  itype.onchange = function() {
    type = this.value
    nframes = types[type];
    set();
  };
  irepeat.onchange = function() {
    isrepeat = isrepeat ? 0 : 1;
    set();
  };
  ipix.onchange = function() {
    ispixel = ispixel ? 0 : 1;
    set();
  };
  iytid.onchange = function() {
    ytid = this.value;
    if (ytplayer) ytplayer.loadVideoById(ytid);
    set();
  };
  irestart.onclick = function() {
    if (ytplayer) ytplayer.seekTo(0);
  };
  window.onYouTubeIframeAPIReady = function() {
    ytplayer = new YT.Player('yt', {
      height: '1',
      width: '1',
      videoId: ytid,
      playerVars: {
        autoplay: 1,
        loop: 1,
        controls: 0
      }
    });
  };
  var types = {
    'parrot': 10,
    'aussiecongaparrot': 10,
    'aussieparrot': 10,
    'aussiereversecongaparrot': 10,
    'blondesassyparrot': 18,
    'bluecluesparrot': 9,
    'boredparrot': 10,
    'chillparrot': 18,
    'christmasparrot': 10,
    'coffeeparrot': 10,
    'confusedparrot': 26,
    'congaparrot': 10,
    'congapartyparrot': 90,
    'darkbeerparrot': 10,
    'dealwithitparrot': 26,
    'dreidelparrot': 10,
    'driedelparrot': 10,
    'driedelparrot2': 10,
    'explodyparrot': 216,
    'fastparrot': 10,
    'fieriparrot': 10,
    'fiestaparrot': 10,
    'gentlemanparrot': 10,
    'gothparrot': 10,
    'hamburgerparrot': 40,
    'harrypotterparrot': 10,
    'ice-cream-parrot': 10,
    'magaritaparrot': 10,
    'middleparrot': 12,
    'moonwalkingparrot': 20,
    'oldtimeyparrot': 10,
    'oriolesparrot': 10,
    'parrotbeer': 10,
    'parrotcop': 10,
    'parrotdad': 8,
    'parrotmustache': 10,
    'parrotsleep': 4,
    'parrotwave1': 11,
    'parrotwave2': 11,
    'parrotwave3': 11,
    'parrotwave4': 11,
    'parrotwave5': 11,
    'parrotwave6': 11,
    'parrotwave7': 10,
    'partyparrot': 10,
    'pizzaparrot': 10,
    'reversecongaparrot': 10,
    'rightparrot': 10,
    'sadparrot': 10,
    'sassyparrot': 18,
    'shufflefurtherparrot': 20,
    'shuffleparrot': 20,
    'shufflepartyparrot': 120,
    'slowparrot': 10,
    'stableparrot': 10,
    'tripletsparrot': 10,
    'twinsparrot': 10,
    'upvotepartyparrot': 10,
    'witnessprotectionparrot': 10,
  };
  for (var p in types) {
    var o = document.createElement('option');
    o.text = p;
    o.value = p;
    itype.add(o);
  }
  if (location.hash && location.hash.length >= 9) {
    fromhash(location.hash);
  }
  set();
})();
