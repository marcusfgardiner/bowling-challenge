var Game = function() {
  this.allFrames =[];
  this.baseScore = 0;
  this.spareScore = 0;
  this.totalScore = 0;
  this.strikeScore = 0;
};

Game.prototype.calculateTotalScore = function() {
  this.calculateBaseScore();
  this.calculateSpareScore();
  this.calculateStrikeScore();
  this.totalScore = this.baseScore + this.spareScore + this.strikeScore;
};

Game.prototype.calculateBaseScore = function() {
  for( var frame of this.allFrames) {
    for( var roll of frame) {
      this.baseScore += roll;
    }
  }
};

Game.prototype.calculateFrameSpareScore = function() {
  for( var frameIndex = 1, len = this.allFrames.length; frameIndex < len; frameIndex++) {
    var currentFrame = this.allFrames[frameIndex];
    var currentFrameScore = this.frameScore(currentFrame);
    var previousFrame = this.allFrames[frameIndex - 1];
    var previousFrameScore = this.frameScore(previousFrame);
    var firstRollScore = this.firstRollScore(previousFrame);
      // if ((frameIndex + 1) === len) {continue;}
      if ((firstRollScore < 10) && (previousFrameScore === 10 ) && (frameIndex < 9)) {
        this.spareScore += this.allFrames[frameIndex][0];
      }
  }
};

// Game.prototype.calculateSpareScore = function() {
//   for( var frameIndex = 0, len = this.allFrames.length; frameIndex < len; frameIndex++) {
//     var currentFrame = this.allFrames[frameIndex];
//     var currentFrameScore = this.frameScore(currentFrame);
//     var firstRollScore = this.firstRollScore(currentFrame);
//       if ((frameIndex + 1) === len) {continue;}
//       else if ((firstRollScore < 10) && (currentFrameScore === 10 ) && (frameIndex < 9)) {
//         this.spareScore += this.allFrames[frameIndex+1][0];
//       }
//   }
// };

Game.prototype.calculateSpareScore = function() {
  for( var frameIndex = 1, len = this.allFrames.length; frameIndex < len; frameIndex++) {
    var previousFrame = this.allFrames[frameIndex - 1];
    var previousFrameScore = this.frameScore(previousFrame);
    var firstRollScore = this.firstRollScore(previousFrame);
      if ((firstRollScore < 10) && (previousFrameScore === 10 )) {
        this.spareScore += this.allFrames[frameIndex][0];
      }
  }
};

Game.prototype.calculateStrikeScore = function() {
  for( var frameIndex = 0, len = this.allFrames.length; frameIndex < len; frameIndex++) {
    if ((frameIndex + 1) === len) {continue;}
    else {
      var currentFrame = this.allFrames[frameIndex];
      var nextFrame = this.allFrames[frameIndex + 1];
      var firstRollScore = this.firstRollScore(currentFrame);
        if (firstRollScore === 10 && frameIndex != 9) {
          var nextRollScore = this.firstRollScore(nextFrame);
          if (nextRollScore === 10 && frameIndex < 8) {
            if ((frameIndex + 2) === len) {continue;}
            else {
              var frameAfterNext = this.allFrames[frameIndex + 2];
              this.strikeScore += (nextRollScore + (this.firstRollScore(frameAfterNext)));
            }
          }
          else {
            this.strikeScore += (this.frameScore(nextFrame));
          }
        }
    }
  }
};

Game.prototype.frameScore = function(frame) {
  return frame[0]+frame[1];
};

Game.prototype.firstRollScore = function(frame) {
  return frame[0];
};