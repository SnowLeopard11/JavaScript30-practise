// 获取html中需要用到的各个参数（准备与js链接）
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 实现视频的播放与暂停
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);


// 为视频状态添加图标，并根据播放/暂停的状态改变图标
// 此种方法可以使用户通过耳机/键盘而非仅鼠标进行播放暂停
function updateButton(){
    const icon = this.paused ?'►' : '❚ ❚';
    toggle.textContent = icon;
}
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);


// 设置视频的快进与快退
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click',skip));


// 设置音量与播放速度
function handleRangeUpdate(){
    video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));


// 设置进度条可随时间变化
function handleProgress(){
    // 通过设置进度条.process__filled在css中的flex-basis百分比来设置进度条宽度
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate',handleProgress);


// 设置进度条可拖拉并播放指定时间画面
// 通过 鼠标点击的偏移位置/宽度*持续时间来获取进度条时间
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
progress.addEventListener('click',scrub);

// 为进度条上的鼠标点击添加监听
let mouse = false;
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() =>mousedown = false);
