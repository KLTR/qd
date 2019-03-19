import {
Injectable
} from '@angular/core';

@Injectable()
export class IconService {

constructor() {}


setAnimatedIcon(source) {
switch (source.state) {
// 0
case 'DOWNLOADING_AGENT':
return {
height: 23,
width: 25,
options: {
path: 'assets/svg-jsons/downloading-agent.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: true,
preserveAspectRatio: 'xMidYMid meet',
scaleMode: 'noScale',
className: 'downloading-agent-animation'
}
}
};
// 1
case 'INITIALIZING':
return {
height: 23,
width: 27,
options: {
path: 'assets/svg-jsons/initializing.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: true,
preserveAspectRatio: 'xMidYMid meet',
className: 'init-animation'
}
}
};
// 2
case 'DOWNLOADING':
return {
height: 23,
width: 27,
options: {
path: 'assets/svg-jsons/downloading.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: true,
preserveAspectRatio: 'xMidYMid meet',
className: 'downloading-animation'
}
}
};
// 3
case 'ACTIVE':
return {
height: 27,
width: 23,
options: {
path: 'assets/svg-jsons/active.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: true,
preserveAspectRatio: 'xMidYMid meet',
className: 'active-animation'
}
}
};
//4
case 'TERMINATING':
return {
height: 27,
width: 27,
options: {
path: 'assets/svg-jsons/shutting-down.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: true,
preserveAspectRatio: 'xMidYMid meet',
className: 'terminating-animation'
}
}
};
}
}

getSourceStatusIcon(status) {
switch (status) {
case 'active':
return {
path: '../../assets/svg-jsons/downloading-agent.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: false,
preserveAspectRatio: 'xMaxYMax meet'
}
};
case 'downloading-agent':
return {
path: '../../assets/svg-jsons/downloading-agent.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: false,
preserveAspectRatio: 'xMidYMid meet',
scaleMode: 'noScale'
}
};
case 'downloading':
return {
path: '../../assets/svg-jsons/downloading.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: false,
preserveAspectRatio: 'xMaxYMax meet'
}
};
case 'initializing':
return {
path: '../../assets/svg-jsons/initializing.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: false,
preserveAspectRatio: 'xMaxYMax meet'
}
};
case 'shutting-down':
return {
path: '../../assets/svg-jsons/shutting-down.json',
autoplay: true,
loop: true,
rendererSettings: {
progressiveLoad: false,
preserveAspectRatio: 'xMidYMid meet'
}
};
}
}

getIcon(name: string, size ? : number): string {
if(!name){
return;
}
switch (name.toLowerCase()) {
case 'target_device_completed':
case 'active':
return `<svg viewBox="0 0 8 14" id="active" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="#a7cff7" d="M7.44 0H.56A.56.56 0 0 0 0 .56v12.88a.56.56 0 0 0 .56.56h6.88a.56.56 0 0 0 .56-.56V.56A.56.56 0 0 0 7.44 0zm-.16.72V10H.72V.72zM3 12a1 1 0 1 1 1 1 1 1 0 0 1-1-1z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'delete_filter':
return `<svg viewBox="0 0 13 13" id="delete_filter" width="${size ? size : ''}" height="${size ? size : ''}">
  <g data-name="Layer 1">
    <path d="M0 0v13h13V0zm12 12H1V1h11z" />
    <path d="M4.38 9.33L6.5 7.21l2.12 2.12.71-.71L7.21 6.5l2.12-2.12-.71-.71L6.5 5.79 4.38 3.67l-.71.71L5.79 6.5 3.67 8.62l.71.71z" />
  </g>
</svg>`;
case 'paperclip':
return `<svg width="${size ? size : ''}" height="${size ? size : ''}" viewBox="0 0 24 24">
  <path d="M21.586 10.461l-10.05 10.075c-1.95 1.949-5.122 1.949-7.071 0s-1.95-5.122 0-7.072l10.628-10.585c1.17-1.17 3.073-1.17 4.243 0 1.169 1.17 1.17 3.072 0 4.242l-8.507 8.464c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7.093-7.05-1.415-1.414-7.093 7.049c-1.172 1.172-1.171 3.073 0 4.244s3.071 1.171 4.242 0l8.507-8.464c.977-.977 1.464-2.256 1.464-3.536 0-2.769-2.246-4.999-5-4.999-1.28 0-2.559.488-3.536 1.465l-10.627 10.583c-1.366 1.368-2.05 3.159-2.05 4.951 0 3.863 3.13 7 7 7 1.792 0 3.583-.684 4.95-2.05l10.05-10.075-1.414-1.414z" />
</svg>`;
case 'export_icon':
return `
<svg viewBox="0 0 19.07 18" id="export_icon" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bLayer_2" data-name="Layer 2">
    <g id="bLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M11 16H2V2h9v3h2V0H0v18h13v-5h-2v3z" />
      <path fill="currentColor" d="M19.07 9L15 4.93V8H6v2h9v3.07L19.07 9z" />
    </g>
  </g>
</svg>`;
case 'shutting-down':
return `<svg viewBox="0 0 8 14" id="shutting-down" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="#a7cff7" d="M7.44 0H.56A.56.56 0 0 0 0 .56v12.88a.56.56 0 0 0 .56.56h6.88a.56.56 0 0 0 .56-.56V.56A.56.56 0 0 0 7.44 0zm-.16.72V10H.72V.72zM3 12a1 1 0 1 1 1 1 1 1 0 0 1-1-1z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'right_arrow':
return `
<svg viewBox="0 0 129 129" width="20px" height="20px">
  <g>
    <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
      fill="#BEDAF8" />
  </g>
</svg>
`
case 'arrow':
return `<svg viewBox="0 0 8.14 15.57" id="arrow" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bLayer_2" data-name="Layer 2">
    <path fill="#6f859d" d="M.07 14.57h8v1h-8zm0-3h8v2h-8zm0-4h8v3h-8zm4-7.57L0 6.07h8.14L4.07 0z" id="bLayer_1-2"
      data-name="Layer 1" />
  </g>
</svg>`;
case 'collapse':
return `<svg viewBox="0 0 11.39 7.95" id="collapse" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="cLayer_2" data-name="Layer 2">
    <path fill="#a7cff7" d="M11.39 1.41L9.98 0 6 3.98l3.98 3.97 1.41-1.41-2.56-2.56 2.56-2.57zM3.98 0L0 3.98l3.98 3.97 1.41-1.41-2.56-2.56 2.56-2.57L3.98 0z"
      id="cLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'collapse-section':
return `<svg viewBox="0 0 5.39 7.95" id="collapse-section" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="dLayer_2" data-name="Layer 2">
    <path fill="#a7cff7" d="M5.39 1.41L3.98 0 0 3.98l3.98 3.97 1.41-1.41-2.56-2.56 2.56-2.57z" id="dLayer_1-2"
      data-name="Layer 1" />
  </g>
</svg>`;
case 'device-active':
return `<svg viewBox="0 0 8 14" id="device-active" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="eLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M7.44 0H.56A.56.56 0 0 0 0 .56v12.88a.56.56 0 0 0 .56.56h6.88a.56.56 0 0 0 .56-.56V.56A.56.56 0 0 0 7.44 0zm-.16.72V10H.72V.72zM3 12a1 1 0 1 1 1 1 1 1 0 0 1-1-1z"
      id="eLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'downloading':
return `<svg viewBox="0 0 8 14" id="downloading" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="fLayer_2" data-name="Layer 2">
    <path fill="#6cfff8" d="M7.44 0H.56A.56.56 0 0 0 0 .56v12.88a.56.56 0 0 0 .56.56h6.88a.56.56 0 0 0 .56-.56V.56A.56.56 0 0 0 7.44 0zm-.16.72V10H.72V.72zM3 12a1 1 0 1 1 1 1 1 1 0 0 1-1-1z"
      id="fLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'tool_is_collecting_data':
return `
<svg xmlns="http://www.w3.org/2000/svg" width="18 " height="28" viewBox="0 0 25 35">
  <g id="Group_187" data-name="Group 187" transform="translate(-452 -449)">
    <path id="Path_423" d="M1861 933h-15a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-26a1 1 0 0 0-1-1zm-7.5 26a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm7.5-5h-15v-20h15z"
      fill="#6cfff8" data-name="Path 423" transform="translate(-1385 -477)" />
    <circle fill="transparent" cx="8.5" cy="8.5" r="8.5" data-name="Ellipse 43" transform="translate(452 449)" />
    <path id="Path_118" d="M1430.64 1075.9l-1.11-1.12a.1.1 0 0 1 .08-.17l3.96-.61a.105.105 0 0 1 .12.12l-.6 3.97a.109.109 0 0 1-.18.07l-1.11-1.11a4.2 4.2 0 0 0 3.39 7.13l-.25 1.63a5.8 5.8 0 0 1-3.73-1.25 6.013 6.013 0 0 1-1.5-1.78 5.831 5.831 0 0 1 .93-6.88zm8.17-.47a5.854 5.854 0 0 0-3.73-1.25l-.28 1.64a4.135 4.135 0 0 1 4.28 2.6 4.206 4.206 0 0 1-.88 4.53l-1.11-1.11a.108.108 0 0 0-.18.08l-.6 3.96a.1.1 0 0 0 .11.12l3.97-.6a.11.11 0 0 0 .08-.18l-1.12-1.11a5.822 5.822 0 0 0 .94-6.88 5.666 5.666 0 0 0-1.48-1.8z"
      fill="#6cfff8" fill-rule="evenodd" data-name="Path 118" transform="translate(-975 -623)" />
  </g>
</svg>
`
case 'device-battery-low':
return `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 8 14">
  <path id="Path_455" d="M1379.657 1214.167h-1.943v-.817a.346.346 0 0 0-.343-.35h-2.743a.346.346 0 0 0-.343.35v.817h-1.943a.346.346 0 0 0-.343.35v12.133a.346.346 0 0 0 .343.35h7.314a.346.346 0 0 0 .343-.35v-12.133a.346.346 0 0 0-.342-.35zm-.8 9.333h-5.714v-8.167h5.714v8.167z"
    fill="#ff4d6a" data-name="Path 455" transform="translate(-1372 -1213)" />
</svg>
`;
case 'device-battery-high':
return `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 8 14">
  <path id="Path_454" d="M1344.657 1214.167h-1.943v-.817a.346.346 0 0 0-.343-.35h-2.743a.346.346 0 0 0-.343.35v.817h-1.943a.346.346 0 0 0-.343.35v12.133a.346.346 0 0 0 .343.35h7.314a.346.346 0 0 0 .343-.35v-12.133a.346.346 0 0 0-.342-.35zm-.8 3.5h-5.714v-2.333h5.714v2.333z"
    fill="#c5e1ff" data-name="Path 454" transform="translate(-1337 -1213)" />
</svg>
`
case 'terminated':
case 'inactive':
return `<svg viewBox="0 0 12.86 18.86" id="inactive" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="gLayer_2" data-name="Layer 2">
    <g id="gLayer_1-2" data-name="Layer 1">
      <path fill="#6a8699" d="M7.5 0a5.35 5.35 0 0 0-5.31 4.86H.56a.56.56 0 0 0-.56.56V18.3a.56.56 0 0 0 .56.56h6.88A.56.56 0 0 0 8 18.3v-7.63A5.35 5.35 0 0 0 7.5 0zM4 17.86a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm3.28-3H.72V5.59h1.44a5.35 5.35 0 0 0 5.12 5.11zM7.5 10a4.64 4.64 0 1 1 4.64-4.64A4.64 4.64 0 0 1 7.5 10z" />
      <path fill="#6a8699" d="M9.76 3.11a.36.36 0 0 0-.52 0L7.51 4.84 5.76 3.11a.36.36 0 0 0-.52 0 .36.36 0 0 0 0 .51L7 5.35 5.24 7.11a.36.36 0 0 0 0 .51.39.39 0 0 0 .26.1.37.37 0 0 0 .26-.1l1.73-1.74 1.75 1.74a.39.39 0 0 0 .26.1.37.37 0 0 0 .26-.1.36.36 0 0 0 0-.51L8 5.37l1.76-1.75a.36.36 0 0 0 0-.51z" />
    </g>
  </g>
</svg>`;
case 'info-second':
return `<svg viewBox="0 0 13.88 13.88" id="info-second" width="${size ? size : '3vw'}" height="${size ? size : '3vw'}">
  <g id="hLayer_2" data-name="Layer 2">
    <g id="hLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M6.94 0a6.94 6.94 0 1 0 6.94 6.94A6.94 6.94 0 0 0 6.94 0zm0 13A6.06 6.06 0 1 1 13 6.94 6.07 6.07 0 0 1 6.94 13z" />
      <path fill="currentColor" d="M6.44 5.44h1v5h-1zm0-2h1v1h-1z" />
    </g>
  </g>
</svg>`;
case 'initializing':
return `<svg viewBox="0 0 8 14" id="initializing" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="iLayer_2" data-name="Layer 2">
    <g id="iLayer_1-2" data-name="Layer 1">
      <path fill="#6cfff8" d="M7.44 0H.56A.56.56 0 0 0 0 .56v12.88a.56.56 0 0 0 .56.56H3v-.72H.72v-2.56h6.56V12H8v-2H.72V.72h6.56V4H8V.56A.56.56 0 0 0 7.44 0z" />
      <path fill="#6cfff8" d="M7.28 5.98H8V8h-.72zm-2.3 7.3h2.29V14H4.98zM4 11.2a.8.8 0 1 0 .8.8.8.8 0 0 0-.8-.8z" />
    </g>
  </g>
</svg>`;
case 'lost-connection-short':
return `<svg viewBox="0 0 12.99 14" id="lost-connection-short" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="jLayer_2" data-name="Layer 2">
    <g id="jLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M9.77 10H3.22v-.43l-.73.43v3.45a.57.57 0 0 0 .57.56h6.87a.56.56 0 0 0 .56-.56V5.32l-.72.43zm-3.28 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zM3.22.72h6.55v2.71l.72-.43V.56A.56.56 0 0 0 9.93 0H3.06a.57.57 0 0 0-.57.56v7.12l.73-.43z" />
      <path fill="currentColor" transform="rotate(-30.26 6.498 6.5)" d="M-.81 6.14h14.62v.72H-.81z" />
    </g>
  </g>
</svg>`;
case 'lost_connection':
return `<svg viewBox="0 0 12.99 14" id="lost-connection-long" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="kLayer_2" data-name="Layer 2">
    <g id="kLayer_1-2" data-name="Layer 1">
      <path fill="#ff4d6a" d="M9.77 10H3.22v-.43l-.73.43v3.45a.57.57 0 0 0 .57.56h6.87a.56.56 0 0 0 .56-.56V5.32l-.72.43zm-3.28 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zM3.22.72h6.55v2.71l.72-.43V.56A.56.56 0 0 0 9.93 0H3.06a.57.57 0 0 0-.57.56v7.12l.73-.43z" />
      <path fill="#ff4d6a" transform="rotate(-30.26 6.498 6.5)" d="M-.81 6.14h14.62v.72H-.81z" />
    </g>
  </g>
</svg>`;
case 'transferring-to-reign':
return `<svg viewBox="0 0 12.86 18.86" id="transferring-to-reign" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="lLayer_2" data-name="Layer 2">
    <path fill="#6a8699" d="M12.86 5.36a5.35 5.35 0 0 0-10.67-.5H.56a.56.56 0 0 0-.56.56V18.3a.56.56 0 0 0 .56.56h6.88A.56.56 0 0 0 8 18.3v-7.63a5.34 5.34 0 0 0 4.86-5.31zM4 17.86a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm-3.28-3V5.59h1.44a5.35 5.35 0 0 0 5.12 5.11v4.16zM7.5 10a4.64 4.64 0 1 1 4.64-4.64A4.64 4.64 0 0 1 7.5 10zM5.37 7.58a.31.31 0 0 1-.22-.09.33.33 0 0 1 0-.45L9 3.24a.31.31 0 0 1 .53.22v2.88a.31.31 0 0 1-.31.31.32.32 0 0 1-.32-.31V4.22L5.6 7.49a.35.35 0 0 1-.23.09zm3.81-3.81H6.52a.31.31 0 0 1-.32-.31.32.32 0 0 1 .32-.32h2.66a.32.32 0 0 1 .31.32.31.31 0 0 1-.31.31z"
      id="lLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'no-wifi':
return `<svg xmlns="http://www.w3.org/2000/svg" width="12.852" height="12.336" viewBox="0 0 15.852 15.336">
  <defs>
  </defs>
  <path id="Path_469" d="M1539.484 1211.619l8.726 14.179-1.851 1.157-8.725-14.179zm8.586 8.679a9.6 9.6 0 0 0-2.548-.948l1.946 3.162 1.145-1.922a9.558 9.558 0 0 0-.4-.216zm-4.5-5.888q-.532 0-1.059.042l1.663 2.7a10.641 10.641 0 0 1 5.7 2.063l1.606-2.2a13.318 13.318 0 0 0-7.913-2.605zm-.465 9.332a2.943 2.943 0 0 0-1.458.513l1.923 2.256.719-.844zm-5.008-8.136a13.739 13.739 0 0 0-2.471 1.441l1.613 2.192a11.054 11.054 0 0 1 2.3-1.3zm2.486 4.038a9.882 9.882 0 0 0-1.515.654c-.176.1-.349.2-.522.305l1.437 2.311c.129-.081.259-.156.391-.228a6.991 6.991 0 0 1 1.678-.654z"
    fill="#ff4d6a" data-name="Path 469" transform="translate(-1535.623 -1211.619)" />
</svg>
`;
case 'Asset_43':
return `<svg viewBox="0 0 83 83" id="Asset_43" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aaLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM66 43.58a22.49 22.49 0 0 1-22 21.23 22.21 22.21 0 0 1-21.38-14.92.78.78 0 0 1 .51-1l3.64-1.13a.76.76 0 0 1 .95.48 17 17 0 1 0 .43-12.54l3-1.65a.87.87 0 0 1 1.17.35l1.36 2.52a.86.86 0 0 1-.34 1.17l-9.14 4.95a.86.86 0 0 1-1.17-.34l-5.13-9.47a.86.86 0 0 1 .35-1.17l2.51-1.36a.86.86 0 0 1 1.17.34l1.32 2.43A22.3 22.3 0 0 1 66 43.58zm-20.2-.78l5.35 5.34a.72.72 0 0 1 0 1l-2.77 2.77a.72.72 0 0 1-1 0L40.42 45a.67.67 0 0 1-.21-.5V33.05a.72.72 0 0 1 .72-.72h3.91a.72.72 0 0 1 .72.72v9.24a.75.75 0 0 0 .21.51z"
      id="aaLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'alert':
return `<svg viewBox="0 0 23.6 18.82" id="alert" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="abLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M23.34 16.4L13.12.71a1.57 1.57 0 0 0-2.63 0L.26 16.4a1.57 1.57 0 0 0 1.31 2.42H22a1.56 1.56 0 0 0 1.34-2.42zm-10.79-1.19a.24.24 0 0 1-.24.24h-1a.24.24 0 0 1-.24-.24v-1a.24.24 0 0 1 .24-.24h1a.24.24 0 0 1 .24.24zm0-2.81a.24.24 0 0 1-.24.24h-1a.24.24 0 0 1-.24-.24V6a.24.24 0 0 1 .24-.24h1a.24.24 0 0 1 .24.24z"
      id="abLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'apps':
case 'containers':
return `<svg viewBox="0 0 83 83" id="apps" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="acLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM29.06 65.27a1 1 0 0 1-1 1H16.9a1 1 0 0 1-1-1V54.12a1 1 0 0 1 1-1h11.16a1 1 0 0 1 1 1zm0-18.19a1 1 0 0 1-1 1H16.9a1 1 0 0 1-1-1V35.92a1 1 0 0 1 1-1h11.16a1 1 0 0 1 1 1zm0-18.2a1 1 0 0 1-1 1H16.9a1 1 0 0 1-1-1V17.73a1 1 0 0 1 1-1h11.16a1 1 0 0 1 1 1zm19 36.39a1 1 0 0 1-1 1H35.92a1 1 0 0 1-1-1V54.12a1 1 0 0 1 1-1h11.16a1 1 0 0 1 1 1zm0-18.19a1 1 0 0 1-1 1H35.92a1 1 0 0 1-1-1V35.92a1 1 0 0 1 1-1h11.16a1 1 0 0 1 1 1zm0-18.2a1 1 0 0 1-1 1H35.92a1 1 0 0 1-1-1V17.73a1 1 0 0 1 1-1h11.16a1 1 0 0 1 1 1zm19 36.39a1 1 0 0 1-1 1H54.94a1 1 0 0 1-1-1V54.12a1 1 0 0 1 1-1H66.1a1 1 0 0 1 1 1zm0-18.19a1 1 0 0 1-1 1H54.94a1 1 0 0 1-1-1V35.92a1 1 0 0 1 1-1H66.1a1 1 0 0 1 1 1zm0-18.2a1 1 0 0 1-1 1H54.94a1 1 0 0 1-1-1V17.73a1 1 0 0 1 1-1H66.1a1 1 0 0 1 1 1z"
      id="acLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'info-apps':
return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
<g id="Group_638" data-name="Group 638" transform="translate(-370 -304)">
    <path id="Rectangle_227" d="M0 0h5v5H0z" fill="#c5e1ff" data-name="Rectangle 227" transform="translate(377 304)"/>
    <path id="Rectangle_228" d="M0 0h5v5H0z" fill="#c5e1ff" data-name="Rectangle 228" transform="translate(377 311)"/>
    <path id="Rectangle_229" d="M0 0h5v5H0z" fill="#c5e1ff" data-name="Rectangle 229" transform="translate(370 311)"/>
    <path id="Rectangle_230" d="M0 0h5v5H0z" fill="#c5e1ff" data-name="Rectangle 230" transform="translate(370 304)"/>
</g>
</svg>
`
case 'info-online':
return `<svg xmlns="http://www.w3.org/2000/svg" width="13.002" height="17.015" viewBox="0 0 13.002 17.015">
<path id="Path_189" d="M4808.99 449.117a.6.6 0 0 0-.41-.367l-6.47-1.735a.649.649 0 0 0-.73.284l-4.35 7.839a.516.516 0 0 0-.01.469.608.608 0 0 0 .39.312l2.49.666-3.82 6.606a.528.528 0 0 0 .18.7.651.651 0 0 0 .37.114.661.661 0 0 0 .42-.149l10.08-8.428a.527.527 0 0 0 .18-.533.6.6 0 0 0-.43-.406l-1.91-.513 3.91-4.342a.514.514 0 0 0 .109-.517z" fill="#b6d1ed" fill-rule="evenodd" data-name="Path 189" transform="translate(-4796.016 -446.99)"/>
</svg>
`
case 'info-tasks':
return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20">
<g id="Group_202" data-name="Group 202" transform="translate(-1726.89 -1125.5)">
    <path id="Path_470" d="M1738.765 1126.5v1.25h1.875V1144h-12.5v-16.25h1.875v-1.25h-3.125v18.75h15v-18.75z" fill="#c5e1ff" data-name="Path 470" transform="translate(0 .25)"/>
    <path id="Path_471" d="M1736.64 1127.244a1.745 1.745 0 0 0-1.744-1.744h-2.764a1.745 1.745 0 0 0-1.743 1.744v3.256h6.25zm-1.25 2.006h-3.75v-2.006a.493.493 0 0 1 .493-.494h2.764a.494.494 0 0 1 .494.494z" fill="#c5e1ff" data-name="Path 471" transform="translate(.875)"/>
    <path id="Path_472" d="M1737.795 1132.03l-.884-.884-4.558 4.558-1.433-1.433-.884.884 2.317 2.317z" fill="#c5e1ff" data-name="Path 472" transform="translate(.787 1.412)"/>
</g>
</svg>
`
case 'battery-low':
return `<svg viewBox="0 0 24.03 9.83" id="battery-low" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <g id="adLayer_2" data-name="Layer 2">
    <g id="adLayer_1-2" data-name="Layer 1">
      <path fill="#ccc676" d="M8.82 1.93H5.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.92a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm-3.88 0H2.05a.11.11 0 0 0-.12.07v5.79a.11.11 0 0 0 .12.11h2.89a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07z" />
      <path fill="#ccc676" d="M23.25 3.08h-.75V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v5.87a2 2 0 0 0 2 2h18.54a2 2 0 0 0 2-2v-1h.75a.79.79 0 0 0 .71-.76V3.87a.79.79 0 0 0-.75-.79zM20.54 9H2A1.12 1.12 0 0 1 .84 7.87V2A1.12 1.12 0 0 1 2 .84h18.54A1.12 1.12 0 0 1 21.66 2v1.7a.33.33 0 0 0 0 .14v2.34a.33.33 0 0 0 0 .14v1.55A1.12 1.12 0 0 1 20.54 9z" />
    </g>
  </g>
</svg>`;
case 'battery-mid':
return `<svg viewBox="0 0 24.03 9.83" id="battery-mid" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <g id="aeLayer_2" data-name="Layer 2">
    <g id="aeLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M8.82 1.93H5.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.92a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm-3.88 0H2.05a.11.11 0 0 0-.12.07v5.79a.11.11 0 0 0 .12.11h2.89a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm7.74 0h-2.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.9a.12.12 0 0 0 .12-.11V2a.12.12 0 0 0-.12-.07z" />
      <path fill="currentColor" d="M23.25 3.08h-.75V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v5.87a2 2 0 0 0 2 2h18.54a2 2 0 0 0 2-2v-1h.75a.79.79 0 0 0 .71-.76V3.87a.79.79 0 0 0-.75-.79zM20.54 9H2A1.12 1.12 0 0 1 .84 7.87V2A1.12 1.12 0 0 1 2 .84h18.54A1.12 1.12 0 0 1 21.66 2v1.7a.33.33 0 0 0 0 .14v2.34a.33.33 0 0 0 0 .14v1.55A1.12 1.12 0 0 1 20.54 9z" />
    </g>
  </g>
</svg>`;
case 'battery-4':
return `<svg viewBox="0 0 24.03 9.83" id="battery-4" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <g id="afLayer_2" data-name="Layer 2">
    <g id="afLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M8.82 1.93H5.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.92a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm-3.88 0H2.05a.11.11 0 0 0-.12.07v5.79a.11.11 0 0 0 .12.11h2.89a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm11.61 0h-2.91a.11.11 0 0 0-.12.11v5.75a.11.11 0 0 0 .12.11h2.91a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm-3.87 0h-2.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.9a.12.12 0 0 0 .12-.11V2a.12.12 0 0 0-.12-.07z" />
      <path fill="currentColor" d="M23.25 3.08h-.75V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v5.87a2 2 0 0 0 2 2h18.54a2 2 0 0 0 2-2v-1h.75a.79.79 0 0 0 .71-.76V3.87a.79.79 0 0 0-.75-.79zm-1.59.58a.33.33 0 0 0 0 .14v2.38a.33.33 0 0 0 0 .14v1.55A1.12 1.12 0 0 1 20.54 9H2A1.12 1.12 0 0 1 .84 7.87V2A1.12 1.12 0 0 1 2 .84h18.54A1.12 1.12 0 0 1 21.66 2z" />
    </g>
  </g>
</svg>`;
case 'power-on':
return `<svg viewBox="0 0 24.03 11.6" id="power-on" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <g id="agLayer_2" data-name="Layer 2">
    <g id="agLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M13.33 8.68h7.15c.07 0 .12 0 .12-.1V2.82a.11.11 0 0 0-.12-.11h-7.56l-.2.74h1.48a1.45 1.45 0 0 1 1.35 1 1.6 1.6 0 0 1-.2 1.55zM.84 8.66V2.74A1.12 1.12 0 0 1 2 1.62h7.24l.62-.84H2a2 2 0 0 0-2 2v5.88a2 2 0 0 0 2 1.95h6.23l.23-.83H2A1.12 1.12 0 0 1 .84 8.66z" />
      <path fill="currentColor" d="M7.42 8.14a1.45 1.45 0 0 1-1.36-1 1.63 1.63 0 0 1 .21-1.54l2.17-2.89H2.05a.11.11 0 0 0-.12.11v5.76c0 .06.05.1.12.1h6.7l.15-.54zm15.83-4.27h-.75V2.74a2 2 0 0 0-2-2h-7.1l-.23.84h7.33a1.13 1.13 0 0 1 1.12 1.12v5.96a1.13 1.13 0 0 1-1.12 1.12h-8l-.62.83h8.64a2 2 0 0 0 2-1.95v-1h.75a.78.78 0 0 0 .73-.77V4.66a.78.78 0 0 0-.75-.79z" />
      <path fill="currentColor" d="M14.63 4.72a.86.86 0 0 0-.79-.57h-1.91l.81-3a1 1 0 0 0-.41-1A.8.8 0 0 0 11.9 0a.82.82 0 0 0-.66.34L7.11 5.92a1 1 0 0 0-.13 1 .85.85 0 0 0 .79.58h1.91l-.81 3a1 1 0 0 0 .41 1 .82.82 0 0 0 .43.12.85.85 0 0 0 .67-.35l4.13-5.57a1 1 0 0 0 .12-.98z" />
    </g>
  </g>
</svg>`;
case 'battery_empty':
return `<svg viewBox="0 0 24.03 9.83" id="battery_empty" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <defs>
    <style>
      .ahcls-1 {
        fill: currentColor
      }

    </style>
  </defs>

  <g id="ahLayer_2" data-name="Layer 2">
    <g id="ahLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M4.94 1.93H2.05a.11.11 0 0 0-.12.07v5.79a.11.11 0 0 0 .12.11h2.89a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07z" />
      <path fill="currentColor" d="M23.25 3.08h-.75V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v5.87a2 2 0 0 0 2 2h18.54a2 2 0 0 0 2-2v-1h.75a.79.79 0 0 0 .71-.76V3.87a.79.79 0 0 0-.75-.79zM20.54 9H2A1.12 1.12 0 0 1 .84 7.87V2A1.12 1.12 0 0 1 2 .84h18.54A1.12 1.12 0 0 1 21.66 2v1.7a.33.33 0 0 0 0 .14v2.34a.33.33 0 0 0 0 .14v1.55A1.12 1.12 0 0 1 20.54 9z" />
    </g>
  </g>
</svg>`;
case 'device-battery-empty':
return `<svg viewBox="0 0 6 10.91" id="device-battery-empty" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <defs>
    <style>
      .aicls-1 {
        fill: currentColor
      }

    </style>
  </defs>

  <g id="aiLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M4 1V0H2v1H0v9.91h6V1zm1 8H1V2h4z" id="aiLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'battery-full':
return `<svg viewBox="0 0 24.03 9.83" id="battery-full" width="${size ? size : '4vw'}" height="${size ? size : '4vw'}">
  <defs>
    <style>
      .ajcls-1 {
        fill: currentColor
      }

    </style>
  </defs>

  <g id="ajLayer_2" data-name="Layer 2">
    <g id="ajLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M8.82 1.93H5.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.92a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm-3.88 0H2.05a.11.11 0 0 0-.12.07v5.79a.11.11 0 0 0 .12.11h2.89a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm11.61 0h-2.91a.11.11 0 0 0-.12.11v5.75a.11.11 0 0 0 .12.11h2.91a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm3.87 0H17.5a.12.12 0 0 0-.12.11v5.75a.12.12 0 0 0 .12.11h2.92a.11.11 0 0 0 .12-.11V2a.11.11 0 0 0-.12-.07zm-7.74 0h-2.9a.12.12 0 0 0-.12.07v5.79a.12.12 0 0 0 .12.11h2.9a.12.12 0 0 0 .12-.11V2a.12.12 0 0 0-.12-.07z" />
      <path fill="currentColor" d="M23.25 3.08h-.75V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v5.87a2 2 0 0 0 2 2h18.54a2 2 0 0 0 2-2v-1h.75a.79.79 0 0 0 .71-.76V3.87a.79.79 0 0 0-.75-.79zm-1.59.58a.33.33 0 0 0 0 .14v2.38a.33.33 0 0 0 0 .14v1.55A1.12 1.12 0 0 1 20.54 9H2A1.12 1.12 0 0 1 .84 7.87V2A1.12 1.12 0 0 1 2 .84h18.54A1.12 1.12 0 0 1 21.66 2z" />
    </g>
  </g>
</svg>`;
case 'browser':
return `<svg viewBox="0 0 83 83" id="browser" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="akLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M30.05 23.78a1.85 1.85 0 0 1-1.85 1.85 1.84 1.84 0 0 1-1.84-1.85 1.84 1.84 0 0 1 1.84-1.84 1.84 1.84 0 0 1 1.85 1.84zm3.47-1.84a1.84 1.84 0 0 0-1.85 1.84 1.85 1.85 0 0 0 1.85 1.85 1.84 1.84 0 0 0 1.84-1.85 1.84 1.84 0 0 0-1.84-1.84zm-10.63 0a1.84 1.84 0 0 0-1.84 1.84 1.84 1.84 0 0 0 1.84 1.85 1.85 1.85 0 0 0 1.85-1.85 1.84 1.84 0 0 0-1.85-1.84zM83 5v73a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h73a5 5 0 0 1 5 5zM65.58 32.2H17.42v31.5a.92.92 0 0 0 .91.92h46.34a.92.92 0 0 0 .91-.92zm0-10.53a3.29 3.29 0 0 0-3.29-3.29H20.71a3.29 3.29 0 0 0-3.29 3.29v7.27h48.16zM30.12 48a11.5 11.5 0 1 1 11.5 11.5A11.51 11.51 0 0 1 30.12 48zm3.58 1.59l.73-.18h.06l.61-.25a.28.28 0 0 1 .31 0l.37.19a.22.22 0 0 0 .18.06l1.22.06a.39.39 0 0 1 .37.49V50a.39.39 0 0 0 .37.49h.49a.39.39 0 0 1 .36.37l.07.43a.35.35 0 0 0 .36.36h.37c.12 0 .18 0 .24.07l1.41 1a.45.45 0 0 1 .12.61l-.18.18c-.06 0-.12.12-.12.18l-.19 1.23c-.06.06-.06.12-.12.18l-1.82 1.94a9.35 9.35 0 0 0 2.71.4 9.5 9.5 0 0 0 8.08-4.52l-.64-.76a.27.27 0 0 1 0-.42.34.34 0 0 0-.07-.55l-.67-.43c0-.06-.06-.06-.12-.06l-2.08-.19a.33.33 0 0 1-.25-.12l-.79-.8a.31.31 0 0 1-.12-.24v-2a.45.45 0 0 1 .12-.24l2.57-2.08a.32.32 0 0 1 .24-.07H49a.34.34 0 0 1 .31.19l.18.37a.2.2 0 0 0 .19.18l.85.31c.07.06.19 0 .31-.07h.08a9.54 9.54 0 0 0-6-6.89.41.41 0 0 1-.12.31l-.3.37a.59.59 0 0 1-.62.25l-.21.02a.67.67 0 0 0-.49.12l-.55.43a.85.85 0 0 1-.37.12h-.79a.7.7 0 0 1-.55-.37l-.31-.55a.54.54 0 0 0-.55-.37h-.18a.6.6 0 0 1-.62-.49v-.07a9.79 9.79 0 0 0-2.3.92l1.14 1.6a.4.4 0 0 1-.12.55l-2 1.1a.56.56 0 0 0-.18.37v.18a.4.4 0 0 1-.37.37.33.33 0 0 0-.37.25l-.18.55c-.06.06-.06.12-.12.18l-.8.74a.4.4 0 0 0-.12.42l.3.8h-.49a.33.33 0 0 1-.3-.18l-.25-.37a.33.33 0 0 0-.3-.18h-.47a9.43 9.43 0 0 0-.17 1.52.39.39 0 0 1 .33.37.43.43 0 0 0 .49.43.39.39 0 0 1 .37.49l-.06.18a.38.38 0 0 0 .41.44z"
      id="akLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'callhistory':
return `<svg viewBox="0 0 83 83" id="callhistory" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="alLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM40.13 22a.33.33 0 0 1 .57-.24l3.1 3.1 6.2-6.2a.37.37 0 0 1 .52 0L53.9 22a.37.37 0 0 1 0 .52l-6.22 6.22 3.13 3.13a.33.33 0 0 1-.24.57l-11.18 1.08a.33.33 0 0 1-.33-.33zm18.12 41.27c-3.19 3.19-15.6.32-27.69-11.77-12.72-12.09-15.91-24.18-12.41-27.68 2.87-2.86 6.37-8 11.46-1.27 5.41 6.36 2.54 8.27-.32 11.13-1.91 2.23 2.23 7.32 7 11.78 4.46 4.45 9.86 8.9 11.77 6.68 2.87-2.87 4.78-5.41 11.46-.32s1.59 8.59-1.27 11.45zm4.92-23a.33.33 0 0 1-.57.24l-3.11-3.1-6.22 6.22a.36.36 0 0 1-.51 0l-3.36-3.34a.37.37 0 0 1 0-.52l6.22-6.22-3.13-3.13a.33.33 0 0 1 .24-.57l11.17-1.06a.34.34 0 0 1 .34.33z"
      id="alLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'chat':
return `<svg viewBox="0 0 83 83" id="chat" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="amLayer_2" data-name="Layer 2">
    <g id="amLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M25.44 27.32A2.53 2.53 0 1 0 28 29.85a2.53 2.53 0 0 0-2.56-2.53zm22.82 17.45a2.13 2.13 0 1 0 2.13 2.13 2.13 2.13 0 0 0-2.13-2.13zm-6.79-12.4A2.53 2.53 0 1 0 39 29.85a2.52 2.52 0 0 0 2.47 2.52z" />
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM33.45 52.46a24.06 24.06 0 0 1-4.69-.46h-.06l-.77-.16a1.71 1.71 0 0 0-1.49.41l-5.87 3.46a.19.19 0 0 1-.29-.21c.27-1.14 1-4.16 1.2-5.14a1.45 1.45 0 0 0-.56-1.48l-.47-.32a18.05 18.05 0 0 1-8.25-14.81C12.18 23.37 21.71 15 33.45 15c11.41 0 20.72 7.9 21.25 17.83C44 33 35.33 40.68 35.33 50.16a14.75 14.75 0 0 0 .17 2.21c-.67.06-1.36.09-2.05.09zM66 62.68c-.13.09-.26.18-.4.26a1.26 1.26 0 0 0-.47 1.26c.18.82.78 3.37 1 4.34a.16.16 0 0 1-.24.18L61 65.8a1.48 1.48 0 0 0-1.26-.35l-.64.14A19.77 19.77 0 0 1 55 66c-9.92 0-18-7.08-18-15.82s8-15.82 18-15.82 18 7.08 18 15.82a15.24 15.24 0 0 1-7 12.5z" />
      <path fill="currentColor" d="M61.8 44.77a2.13 2.13 0 1 0 2.13 2.13 2.13 2.13 0 0 0-2.13-2.13z" />
    </g>
  </g>
</svg>`;
case 'contacts':
return `<svg viewBox="0 0 83 83" id="contacts" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="anLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM41.36 16.68a10.54 10.54 0 1 1-10.54 10.54 10.54 10.54 0 0 1 10.54-10.54zM61 65.91H22.62c-3 0-4.1-1.07-4.1-5.83S22 48.86 25.21 45s7.13-4.1 9.5-3 6.93 1 6.93 1H42s4.55 0 6.92-1.08 6.27-.87 9.51 3 6.69 10.36 6.69 15.11S64 65.91 61 65.91z"
      id="anLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'device-battery-full':
return `<svg viewBox="0 0 6 10.91" id="device-battery-full" width="${size ? size : '1.4992503748125938vh'}" height="${size ? size : '1.4992503748125938vh'}">
  <defs>
    <style>
      .aocls-1 {
        fill: currentColor
      }

    </style>
  </defs>

  <g id="aoLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M4 1V0H2v1H0v9.91h6V1zm1 3H1V2h4z" id="aoLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'hangout':
return `<svg viewBox="0 0 83 83" id="hangout" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="apLayer_2" data-name="Layer 2">
    <g id="apLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M41.54 41.28h6.3v6.36s4.84-.43 4.84-6.36V29.75H41.54zm-14.91 0h6.31v6.36s4.84-.43 4.84-6.36V29.75H26.63z" />
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM64.34 47c-4 10.38-13.77 19.14-24.5 24.84V62.5c-14.54 0-26.33-10.68-26.33-25.22A26.33 26.33 0 1 1 64.34 47z" />
    </g>
  </g>
</svg>`;
case 'hide-photo':
return `<svg viewBox="0 0 14 17.47" id="hide-photo" width="${size ? size : '19'}" height="${size ? size : '21'}">
  <g id="aqLayer_2" data-name="Layer 2">
    <g id="aqLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M1 14.55v-11h2.28l-.37-1H0v13h7.75l-.37-1H1zm5.11-12l.37 1H13v11h-2.42l.37 1H14v-13H6.11z" />
      <path fill="currentColor" d="M7.06 5.09l1 2.73a1.57 1.57 0 0 0-1-2.73zM11 12.82v-.75a3.22 3.22 0 0 0-2.51-3.13l1.44 3.88zm-4.27 0L5.31 9A3.2 3.2 0 0 0 3 12.07v.75z" />
      <path fill="currentColor" transform="rotate(-20.42 6.824 8.738)" d="M6.31-.4h1v18.27h-1z" />
    </g>
  </g>
</svg>`;
case 'info':
case 'device info':
return `<svg viewBox="0 0 83 83" id="info" preserveAspectRatio="none" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="arLayer_2" data-name="Layer 2" width="35px" height="35px">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM44.78 64.71A1.77 1.77 0 0 1 43 66.48h-5.2a1.78 1.78 0 0 1-1.8-1.77v-28.1a1.78 1.78 0 0 1 1.78-1.77H43a1.77 1.77 0 0 1 1.77 1.77zM40.4 29.93a5.46 5.46 0 1 1 5.46-5.46 5.47 5.47 0 0 1-5.46 5.46z"
      id="arLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'interceptor':
return `<svg viewBox="0 0 31.75 12.75" id="interceptor" width="${size ? size : '4.6vw'}" height="${size ? size : '4.6vw'}">
  <defs>
    <style>
      .ascls-1 {
        fill: currentColor
      }

    </style>
  </defs>
  <g id="asLayer_2" data-name="Layer 2">
    <path class="ascls-1" d="M16.5 0v4.88h-1.25V0h-14A1.25 1.25 0 0 0 0 1.25V11.5a1.25 1.25 0 0 0 1.25 1.25h14V7.88h1.25v4.87h14a1.25 1.25 0 0 0 1.25-1.25V1.25A1.25 1.25 0 0 0 30.5 0z"
      id="asLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'interceptor-failed':
return `<svg viewBox="0 0 35.74 12.75" id="interceptor-failed" width="${size ? size : '4.6vw'}" height="${size ? size : '4.6vw'}">
  <defs>
    <style>
      .atcls-1 {
        fill: currentColor
      }

    </style>
  </defs>

  <g id="atLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M15.25 0h-14A1.25 1.25 0 0 0 0 1.25V11.5a1.25 1.25 0 0 0 1.25 1.25h14V7.88h3.5v-3h-3.5zm5.24 0v4.88h3.89v3h-3.89v4.87h14a1.25 1.25 0 0 0 1.24-1.25V1.25A1.25 1.25 0 0 0 34.5 0z"
      id="atLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'line':
return `<svg viewBox="0 0 83 83" id="line" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="auLayer_2" data-name="Layer 2">
    <g id="auLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM64.88 50.69a5.91 5.91 0 0 1-.51.64 23.3 23.3 0 0 1-3 3c-7.6 7-20.11 15.39-21.76 14.1-1.44-1.13 2.36-6.61-2-7.52l-.92-.12C23.79 59 14 50 14 39.12c0-12.15 12.3-22 27.48-22S69 27 69 39.12a18.79 18.79 0 0 1-4.12 11.57z" />
      <path fill="currentColor" d="M25.55 46.14h5.55a1.43 1.43 0 0 0 1.43-1.43v-.12a1.43 1.43 0 0 0-1.43-1.43h-4v-9.08a1.45 1.45 0 0 0-1.44-1.44h-.12a1.44 1.44 0 0 0-1.43 1.44v10.63a1.44 1.44 0 0 0 1.44 1.43zm34.35-6.66v-.12a1.43 1.43 0 0 0-1.43-1.43h-4v-2.27h4a1.44 1.44 0 0 0 1.43-1.44v-.12a1.43 1.43 0 0 0-1.43-1.43h-5.55a1.44 1.44 0 0 0-1.43 1.43v10.63a1.44 1.44 0 0 0 1.43 1.44h5.55a1.44 1.44 0 0 0 1.43-1.44v-.12a1.44 1.44 0 0 0-1.43-1.43h-4v-2.27h4a1.43 1.43 0 0 0 1.43-1.43zm-10.66 6.23a1.4 1.4 0 0 0 .42-1V34.08a1.45 1.45 0 0 0-1.44-1.44h-.12a1.44 1.44 0 0 0-1.43 1.44v6.24l-5.18-7a1.45 1.45 0 0 0-1.25-.73h-.12a1.44 1.44 0 0 0-1.43 1.44v10.68a1.44 1.44 0 0 0 1.43 1.43h.12a1.44 1.44 0 0 0 1.44-1.43v-6.36l5.22 7.13a.71.71 0 0 0 .1.14 1.14 1.14 0 0 0 .56.41 1.41 1.41 0 0 0 .54.11h.12a1.39 1.39 0 0 0 .67-.17.79.79 0 0 0 .35-.26zm-14.12.43h.12a1.43 1.43 0 0 0 1.43-1.43V34.08a1.44 1.44 0 0 0-1.43-1.44h-.12a1.44 1.44 0 0 0-1.43 1.44v10.63a1.43 1.43 0 0 0 1.43 1.43z" />
    </g>
  </g>
</svg>`;
case 'live_calls':
return `<svg viewBox="0 0 15.22 15.12" id="live_calls" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="gLayer_2" data-name="Layer 2">
    <g id="gLayer_1-2" data-name="Layer 1">
      <circle fill="currentColor" cx="1.6" cy="13.62" r="1.5" />
      <path fill="currentColor" d="M0 1.79a.29.29 0 0 0 .33.29A10.69 10.69 0 0 1 1.6 2a11.63 11.63 0 0 1 11.62 11.62 12.46 12.46 0 0 1-.09 1.38h2a12.5 12.5 0 0 0 .07-1.38A13.62 13.62 0 0 0 1.6 0C1.15 0 .71 0 .27.07A.31.31 0 0 0 0 .38z" />
      <path fill="currentColor" d="M1.6 4a9.83 9.83 0 0 0-1.34.1.31.31 0 0 0-.26.3v1.41a.3.3 0 0 0 .35.3 7.64 7.64 0 0 1 5.13.95h.06c3.34 2.82 3.92 5.33 3.6 7.56a.3.3 0 0 0 .3.34h1.67a10.42 10.42 0 0 0 .11-1.38A9.62 9.62 0 0 0 1.6 4z" />
      <path fill="currentColor" d="M1.6 8.22a5.23 5.23 0 0 0-1.38.2.31.31 0 0 0-.22.3v1.37a.35.35 0 0 0 .48.33 3.57 3.57 0 0 1 3.6.78.27.27 0 0 1 .07.08 3.59 3.59 0 0 1 .69 3.35.3.3 0 0 0 .29.37h1.3c.27 0 .4-.09.43-.23A5.33 5.33 0 0 0 1.6 8.22z" />
    </g>
  </g>
</svg>`;
case 'log':
return `<svg viewBox="0 0 15 13" id="log" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="hLayer_2" data-name="Layer 2">
    <g id="hLayer_1-2" data-name="Layer 1">
      <rect fill="currentColor" x="5" width="10" height="3" rx=".3" ry=".3" />
      <rect fill="currentColor" width="3" height="3" rx=".3" ry=".3" transform="rotate(180 1.5 1.5)" />
      <rect fill="currentColor" x="5" y="5" width="10" height="3" rx=".3" ry=".3" />
      <rect fill="currentColor" y="5" width="3" height="3" rx=".3" ry=".3" transform="rotate(180 1.5 6.5)" />
      <rect fill="currentColor" x="5" y="10" width="10" height="3" rx=".3" ry=".3" />
      <rect fill="currentColor" y="10" width="3" height="3" rx=".3" ry=".3" transform="rotate(180 1.5 11.5)" />
    </g>
  </g>
</svg>`;
case 'emails':
return `<svg viewBox="0 0 83 83" id="emails" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="axLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM13.55 22.61h55.9a.3.3 0 0 1 .24.12L44 43.93l-1.07.89h-.07l-.09.06a2.21 2.21 0 0 1-1.19.35 2.11 2.11 0 0 1-1.33-.44L13.36 22.68a.28.28 0 0 1 .19-.07zm-.3 3L32.5 41.48 13.25 57zm56.5 34.48a.31.31 0 0 1-.3.3h-55.9a.31.31 0 0 1-.3-.3V60l21.1-17 4.41 3.64a4.57 4.57 0 0 0 5.64 0l4.27-3.52L69.75 60zm0-3.05L50.52 41.59l19.23-15.87z"
      id="axLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'map':
return `<svg viewBox="0 0 83 83" id="map" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="ayLayer_2" data-name="Layer 2">
    <g id="ayLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM50.93 51.39c-3.43 6.15-6.81 11.29-7 11.5l-2 3.11a.52.52 0 0 1-.86 0l-2-3.11c-.14-.21-3.52-5.35-7-11.5-4.86-8.71-7.23-14.74-7.23-18.39a16.66 16.66 0 1 1 33.32 0c0 3.65-2.37 9.68-7.23 18.39z" />
      <path fill="currentColor" d="M41.25 26.68a5.35 5.35 0 0 0 .25 10.7 5.35 5.35 0 1 0-.25-10.7z" />
    </g>
  </g>
</svg>`;
case 'menu':
return `<svg viewBox="0 0 17 16" id="menu" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="azLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M0 0h17v2H0zm0 7h17v2H0zm0 7h17v2H0z" id="azLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'messages':
return `<svg viewBox="0 0 83 83" id="messages" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="baLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM40.74 62.88a33.81 33.81 0 0 1-8.21-1c-4.64 3.51-7.77 4-9 4.05a.28.28 0 0 1-.24-.46c.62-.83 2-2.64 2.79-3.77 1.08-1.49 0-2.22 0-2.22-7.92-4-13.19-11.18-13.19-19.36 0-12.57 12.45-22.76 27.82-22.76s27.85 10.19 27.85 22.76S56.1 62.88 40.74 62.88z"
      id="baLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'messenger':
return `<svg viewBox="0 0 83 83" id="messenger" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bbLayer_2" data-name="Layer 2">
    <g id="bbLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM41.5 64.6a29.71 29.71 0 0 1-8-1.08l-9.4 5.22v-9.86a25.15 25.15 0 0 1-10.34-20.13c0-14.27 12.42-25.84 27.74-25.84s27.74 11.57 27.74 25.84S56.82 64.6 41.5 64.6z" />
      <path fill="currentColor" d="M38.57 31.52l-15.16 16.2 13.78-7.59 7.07 7.59 15.16-16.2-13.61 7.58-7.24-7.58z" />
    </g>
  </g>
</svg>`;
case 'no_signal':
return `<svg viewBox="0 0 20.29 18.65" id="no_signal" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bcLayer_2" data-name="Layer 2">
    <g id="bcLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M4.3 4.18A14.31 14.31 0 0 0 0 6.8l1.66 1.86a11.74 11.74 0 0 1 4-2.31zm2.42 3.88A12.24 12.24 0 0 0 2.86 10l1.48 2a9.82 9.82 0 0 1 3.77-1.71zm9.37 3.67L17.4 10a12.55 12.55 0 0 0-3.55-1.81zM10.7 3.11l1.67 2.66a12.42 12.42 0 0 1 6.26 2.89l1.66-1.86a15 15 0 0 0-9.59-3.69zm-.01 11.3l-1.54-2.47A8.66 8.66 0 0 0 6 13l-.48.28 1.32 2.12a2.5 2.5 0 0 1 .35-.21 6 6 0 0 1 3.5-.78zm-2.31 2.18l1.77 2.06 1.77-2.08a3.41 3.41 0 0 0-3.54.02z" />
      <path fill="currentColor" transform="rotate(-31.8 10.592 8.507)" d="M9.55-.9h2v18.87h-2z" />
    </g>
  </g>
</svg>`;
case 'online':
return `<svg viewBox="0 0 9.66 14.04" id="online" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="iLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M9.64 1.75a.45.45 0 0 0-.3-.3L4.53 0A.46.46 0 0 0 4 .25L.76 6.72a.44.44 0 0 0 0 .39.47.47 0 0 0 .24.26l1.85.55-2.8 5.45a.45.45 0 0 0 .13.57.48.48 0 0 0 .28.1.48.48 0 0 0 .31-.13L8.26 7a.45.45 0 0 0 .13-.44.46.46 0 0 0-.31-.34l-1.43-.46 2.91-3.58a.45.45 0 0 0 .08-.43z"
      id="iLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'passwords':
case 'keychains':
return `<svg viewBox="0 0 83 83" id="passwords" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="beLayer_2" data-name="Layer 2">
    <g id="beLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM67.36 65a.38.38 0 0 1-.38.38h-8.17a.37.37 0 0 1-.37-.38v-4.62a.38.38 0 0 0-.38-.37h-4.6a.37.37 0 0 1-.37-.38V55a.38.38 0 0 0-.38-.38h-4.83a.36.36 0 0 1-.26-.11l-7.92-7.89a16.77 16.77 0 0 1-5.36.9 15.17 15.17 0 1 1 15.17-15.17 18.45 18.45 0 0 1-.89 5.35l18.63 18.64a.36.36 0 0 1 .11.26z" />
      <path fill="currentColor" d="M29.88 23.88a4 4 0 1 0 4 4 3.93 3.93 0 0 0-4-4z" />
    </g>
  </g>
</svg>`;
case 'power':
return `<svg viewBox="0 0 20 21" id="power" width="${size ? size : '3vw'}" height="${size ? size : '3vw'}">

  <g id="bfLayer_2" data-name="Layer 2">
    <g id="bfLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M13 1.45v2.14a8 8 0 1 1-6 0V1.45a10 10 0 1 0 5.92 0z" />
      <path fill="currentColor" d="M9 0h2v11H9z" />
    </g>
  </g>
</svg>`;
case 'settings':
return `<svg viewBox="0 0 14.96 15.52" id="settings" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="kLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M1.87 13a.3.3 0 0 1-.39-.11L0 10.39A.29.29 0 0 1 .14 10l1.28-.79a.53.53 0 0 0 .24-.43v-2a.56.56 0 0 0-.24-.43L.14 5.52A.29.29 0 0 1 0 5.13l1.44-2.5a.29.29 0 0 1 .39-.11l1.32.72a.58.58 0 0 0 .5 0l1.76-1a.58.58 0 0 0 .26-.42V.32A.29.29 0 0 1 6 0h2.92a.29.29 0 0 1 .29.28v1.51a.58.58 0 0 0 .26.42l1.76 1a.58.58 0 0 0 .5 0l1.32-.72a.3.3 0 0 1 .39.11l1.44 2.5a.29.29 0 0 1-.1.39l-1.28.79a.53.53 0 0 0-.24.43v2a.56.56 0 0 0 .24.43l1.28.79a.29.29 0 0 1 .1.39l-1.44 2.5a.3.3 0 0 1-.39.11l-1.32-.72a.58.58 0 0 0-.5 0l-1.76 1a.56.56 0 0 0-.26.42v1.5a.29.29 0 0 1-.29.29H6a.29.29 0 0 1-.29-.28v-1.51a.58.58 0 0 0-.26-.42l-1.76-1a.58.58 0 0 0-.5 0zm3.8-2.1A3.62 3.62 0 1 0 4.34 6a3.62 3.62 0 0 0 1.33 4.9z"
      id="kLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'show-photo':
return `<svg viewBox="0 0 14 13" id="show-photo" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bhLayer_2" data-name="Layer 2">
    <g id="bhLayer_1-2" data-name="Layer 1">
      <circle fill="currentColor" cx="7" cy="4.12" r="1.58" />
      <path fill="currentColor" d="M0 0v13h14V0zm13 12H1V1h12z" />
      <path fill="currentColor" d="M11 9.52A3.22 3.22 0 0 0 7.78 6.3H6.22A3.22 3.22 0 0 0 3 9.52v.75h8z" />
    </g>
  </g>
</svg>`;
case 'signal':
return `<svg viewBox="0 0 83 83" id="signal" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="biLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM67.77 37.14l-1 .1a21.35 21.35 0 0 0-1.55-6.12l1-.4a22.79 22.79 0 0 1 1.55 6.42zm-6.41-13.71a24.51 24.51 0 0 1 3.87 5.36l-.93.5a23.06 23.06 0 0 0-3.7-5.13zm.9 16.43c0 10.53-9.3 19.06-20.76 19.06a22.46 22.46 0 0 1-5.61-.71l-7 3.68a.26.26 0 0 1-.38-.22L28 54.32a18.38 18.38 0 0 1-7.25-14.46c0-10.52 9.3-19 20.77-19s20.74 8.48 20.74 19zm-7.88-21.64A26.73 26.73 0 0 1 59.83 22l-.7.78a25.41 25.41 0 0 0-5.24-3.58zm-8.27-2.71a28.33 28.33 0 0 1 6.35 1.82l-.41 1a26.73 26.73 0 0 0-6.11-1.75zM44 15.25l-.09 1.05a28.18 28.18 0 0 0-6.36.17l-.15-1a29.13 29.13 0 0 1 6.6-.22zm-8.68.56l.22 1a26.84 26.84 0 0 0-6 2.09l-.45-.9a27.65 27.65 0 0 1 6.24-2.19zM27.22 19l.54.91a25.09 25.09 0 0 0-5 3.89l-.76-.75A26.57 26.57 0 0 1 27.22 19zm-6.65 5.63l.81.67A22.68 22.68 0 0 0 18 30.66l-1-.43a23.86 23.86 0 0 1 3.57-5.61zm-4.28 7.59l1 .34a21.2 21.2 0 0 0-1.12 6.21h-1.05a22.65 22.65 0 0 1 1.17-6.56zm-1.14 8.64l1-.05a26.18 26.18 0 0 0 1.05 6.27l-1 .3a27.19 27.19 0 0 1-1.05-6.53zm5.12 14.24a21.68 21.68 0 0 1-3.33-5.73l1-.38a20.9 20.9 0 0 0 3.18 5.45zm3 3a17.9 17.9 0 0 1-1.59-1.42l.74-.74a20.44 20.44 0 0 0 1.63 1.44l.13.1 1.26 4.24-1 .3zm2.9 9.76l-1.13-3.8 1-.3.74 2.5 2.24-1.35.54.91zm11.5-4.46a29.16 29.16 0 0 1-3.07-.59L32 64.39l-.54-.9 3-1.81.21.06a28.45 28.45 0 0 0 3.16.62zm3.83.25h-1.72l.06-1.05a28.06 28.06 0 0 0 6.35-.34l.18 1a28.33 28.33 0 0 1-4.87.39zm6.94-.85l-.25-1a26.21 26.21 0 0 0 5.93-2.26l.49.93a27.2 27.2 0 0 1-6.17 2.33zm8-3.41l-.56-.89a24.8 24.8 0 0 0 4.88-4l.77.72a26 26 0 0 1-5.08 4.17zm6.47-5.84l-.83-.64a22.5 22.5 0 0 0 3.18-5.48l1 .4a23.31 23.31 0 0 1-3.34 5.72zm4-7.73l-1-.3a21.42 21.42 0 0 0 .89-6.12v-.13h1v.14a22.47 22.47 0 0 1-.86 6.41z"
      id="biLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'skype':
return `<svg viewBox="0 0 83 83" id="skype" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bjLayer_2" data-name="Layer 2">
    <g id="bjLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M42.53 37.59c-9.73-1.9-10.36-4.87-8-6.94s9.31-3 11.27.63 3.2 4.95 5.83 4.32 2.86-4.05 1.81-6.12c-.85-1.68-4.69-5.95-12.26-5.95s-15.5 2.79-15.5 9.73 7.21 10 14.15 11 8.56 4 7.66 6.13-3.88 4.24-8.38 3.79-6.59-4.24-7.21-6.18-2.7-2.07-3.7-2-4.14 1.35-2.7 5.76 6.13 7.93 15.5 7.93S55.87 54 55.87 48.49s-3.61-9.01-13.34-10.9z" />
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM53.24 69.61a15.17 15.17 0 0 1-7.68-2.08 26.38 26.38 0 0 1-30.95-30.95 15.22 15.22 0 0 1 20.82-20.82 26.38 26.38 0 0 1 31.44 25.88 27.32 27.32 0 0 1-.48 5.07 15.23 15.23 0 0 1-13.15 22.9z" />
    </g>
  </g>
</svg>`;
case 'storage_1':
return `<svg viewBox="0 0 17 10" id="storage_1" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bkLayer_2" data-name="Layer 2">
    <g id="bkLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M8 7h1v1H8zM1 0H0v10h5V0H1zm3 9H1V1h3z" />
      <path fill="currentColor" d="M2 7h1v1H2zm5-7H6v10h5V0H7zm3 9H7V1h3zm6-9h-4v10h5V0zm-1 8h-1V7h1z" />
    </g>
  </g>
</svg>`;
case 'storage-half':
return `<svg viewBox="0 0 17 10" id="storage-half" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="blLayer_2" data-name="Layer 2">
    <g id="blLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M16 0h-4v10h5V0zm-1 8h-1V7h1zM1 0H0v10h5V0H1zm3 9H1V1h3z" />
      <path fill="currentColor" d="M2 7h1v1H2zm5-7H6v10h5V0H7zm2 8H8V7h1z" />
    </g>
  </g>
</svg>`;
case 'storage-empty':
return `<svg viewBox="0 0 17 10" id="storage-empty" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bmLayer_2" data-name="Layer 2">
    <g id="bmLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M1 0H0v10h5V0H1zm3 9H1V1h3z" />
      <path fill="currentColor" d="M2 7h1v1H2zm5-7H6v10h5V0H7zm3 9H7V1h3z" />
      <path fill="currentColor" d="M8 7h1v1H8zm8-7h-4v10h5V0zm0 9h-3V1h3z" />
      <path fill="currentColor" d="M14 7h1v1h-1z" />
    </g>
  </g>
</svg>`;
case 'storage-full':
return `<svg viewBox="0 0 17 10" id="storage-full" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bnLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M1 0H0v10h5V0H1zm2 8H2V7h1zm4-8H6v10h5V0H7zm2 8H8V7h1zm7-8h-4v10h5V0zm-1 8h-1V7h1z" id="bnLayer_1-2"
      data-name="Layer 1" />
  </g>
</svg>`;
case 'telegram':
return `<svg viewBox="0 0 82.93 82.93" id="telegram" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">
  <g id="boLayer_2" data-name="Layer 2">
    <g id="boLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M77.94 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5.06-5zM41.48 68.19a27.62 27.62 0 1 1 27.61-27.62 27.62 27.62 0 0 1-27.61 27.62z" />
      <path fill="currentColor" d="M32.18 44.77l-7.25-2.44a1 1 0 0 1 0-1.86l28.48-11.06a1.25 1.25 0 0 1 1.68 1.42l-4.81 23.09a1.62 1.62 0 0 1-2.54 1L36.42 46.7" />
      <path fill="currentColor" d="M35.72 53.88a1.07 1.07 0 0 1-.83-.74l-2.71-8.37L49.51 34a.15.15 0 0 1 .18.23L36.42 46.7" />
      <path fill="currentColor" d="M36.42 46.7L41 50l-4.33 3.65a1.12 1.12 0 0 1-.84.25h-.08l.69-7.09z" />
    </g>
  </g>
</svg>`;
case 'tweeter':
return `<svg viewBox="0 0 83 83" id="tweeter" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bpLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM67.21 25.13c-.36.95-2.07 5.26-4.4 7.47.58 5.36-.75 13.24-9.35 22.1a26 26 0 0 1-19.21 8.17 38.41 38.41 0 0 1-17.68-4.72 1.87 1.87 0 0 1-.79-2.21 1.84 1.84 0 0 1 2-1.23 15.5 15.5 0 0 0 10.83-2.25c-4.84-3.66-15.67-14-9-29.35A1.87 1.87 0 0 1 21.15 22a1.89 1.89 0 0 1 1.71.86c.2.31 4.86 7.32 16.51 8.79a11.56 11.56 0 0 1 11.54-11.52A11.41 11.41 0 0 1 58.53 23c3.06-.33 5.46-.4 5.58-.4a2 2 0 0 1 .7.12 1.93 1.93 0 0 1 1.32 0 1.86 1.86 0 0 1 1.08 2.41z"
      id="bpLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'viber':
return `<svg viewBox="0 0 83 83" id="viber" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bqLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM61.74 58.88a9.39 9.39 0 0 1-1.2 2 18.52 18.52 0 0 1-2.64 2.88 1.94 1.94 0 0 1-.48.41c-.16.08-.24.16-.4.24a6.29 6.29 0 0 1-1.93 1 3.74 3.74 0 0 1-1.36.24 5.11 5.11 0 0 1-2.88-.56c-1.13-.48-2.25-1-3.29-1.45-.08-.08-.24-.08-.32-.16-1-.48-2.08-1-3.05-1.52-.16-.08-.24-.16-.4-.24L40.91 60c-.08-.08-.16-.08-.24-.16a61.12 61.12 0 0 1-16.11-14.67c-.48-.56-.88-1.12-1.28-1.68a9.71 9.71 0 0 1-.8-1.12c-.16-.16-.24-.4-.4-.56-.32-.48-.64-1-1-1.52 0-.08-.08-.08-.08-.16-.32-.48-.64-1.05-1-1.53v-.08a53.55 53.55 0 0 1-3.68-7.85c-1-3-1.12-4.17-.24-5.69a17 17 0 0 1 3.2-3c2-1.45 2.89-2 3.61-2.17a5.94 5.94 0 0 1 2 .16c.24.16.64.32.88.48 1.45 1 5.45 6 6.9 8.66.8 1.44 1 2.48.8 3.28s-.64 1.29-2.49 2.73c-.4.32-.8.72-1.12 1-.08 0-.16.08-.24.16l-.08.08-.08.08A3.75 3.75 0 0 0 29 38a11.9 11.9 0 0 0 1.92 5.29 21.09 21.09 0 0 0 3.85 4.41 21.24 21.24 0 0 0 5 3.52c2.24 1.05 3.6 1.37 4.64.89a2.8 2.8 0 0 0 .49-.24.08.08 0 0 1 .08-.08 13.73 13.73 0 0 0 1.28-1.53c1-1.12 1.36-1.6 1.84-1.84a3.9 3.9 0 0 1 .56-.24 4.35 4.35 0 0 1 3.29.32c.8.4 2.64 1.52 3.84 2.32a48.53 48.53 0 0 1 5.37 4.25A2.67 2.67 0 0 1 61.9 57c0 .51-.08 1.08-.16 1.88zM47 29.31a15.15 15.15 0 0 0-5.93-1.76 2 2 0 0 1-1.44-.55 1.22 1.22 0 0 1-.16-1.6c.4-.64 1-.72 2.88-.4A15 15 0 0 1 53 31.23a13.92 13.92 0 0 1 2.4 6.65 16.11 16.11 0 0 1 0 2.81 1.27 1.27 0 0 1-.72.72 1.45 1.45 0 0 1-1.28-.08c-.56-.32-.8-.72-.8-2a11.23 11.23 0 0 0-1.44-5.6A11.07 11.07 0 0 0 47 29.31zm2 10.58a1.44 1.44 0 0 1-1.76 0c-.4-.24-.48-.57-.56-1.37a8.16 8.16 0 0 0-.56-2.4c-.64-1.44-1.85-2.16-3.85-2.4-1-.08-1.2-.24-1.52-.57a1.39 1.39 0 0 1 .4-2.08c.32-.16.4-.16 1-.08a6.22 6.22 0 0 1 1.28.16 7.9 7.9 0 0 1 3.69 1.76 7 7 0 0 1 2.24 4.65c.2 1.36.12 1.92-.36 2.33zm12.66 2.64a1.43 1.43 0 0 1-2.32-.24c-.16-.24-.16-.48-.24-1.52a27 27 0 0 0-.4-3.93 17.83 17.83 0 0 0-7.13-11.62c-3.21-2.32-6-3.2-10.34-3.52-1.52 0-1.76 0-2.08-.32a1.42 1.42 0 0 1-.08-2.09c.4-.32.64-.32 1.92-.32a18.25 18.25 0 0 1 2.16.16A18.63 18.63 0 0 1 49.8 21a21.48 21.48 0 0 1 5.77 4 17.71 17.71 0 0 1 3.93 5.29A24.51 24.51 0 0 1 62 40.53c.06 1.28 0 1.6-.34 2z"
      id="bqLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'whatsapp':
return `<svg viewBox="0 0 83 83" id="whatsapp" width="${size ? size : '23px'}" height="${size ? size : '23px'}">
  <g id="brLayer_2" data-name="Layer 2">
    <g id="brLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM42 69.67a29.28 29.28 0 0 1-14.1-3.6L11.8 71.2l5.26-15.52a28.69 28.69 0 0 1-4.18-14.94A29.16 29.16 0 1 1 42 69.67z" />
      <path fill="currentColor" d="M42 16.41a24.45 24.45 0 0 0-24.48 24.33A24.1 24.1 0 0 0 22.19 55l-3.06 9 9.42-3A24.39 24.39 0 1 0 42 16.41zm14.35 34.36c-.6 1.66-3.52 3.26-4.83 3.37s-1.31 1.07-8.58-1.77-11.85-10.23-12.21-10.71-2.91-3.84-2.91-7.33a7.92 7.92 0 0 1 2.5-5.92 2.61 2.61 0 0 1 1.9-.88h1.37c.37 0 1-.23 1.61 1.19s2 4.91 2.21 5.26a1.33 1.33 0 0 1 .06 1.25 5 5 0 0 1-.72 1.18c-.36.41-.75.92-1.07 1.24s-.73.74-.31 1.45a21.25 21.25 0 0 0 4 4.91 19.89 19.89 0 0 0 5.75 3.52c.71.35 1.13.29 1.55-.18s1.79-2.07 2.26-2.78 1-.59 1.61-.36 4.17 2 4.89 2.31 1.19.53 1.37.83a6 6 0 0 1-.45 3.42z" />
    </g>
  </g>
</svg>`;
case 'wickr':
return `<svg viewBox="0 0 83 83" id="wickr" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bsLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM10 55.72l34.28-34.31 5.87 5.87-34.32 34.31zm28.76 5.87l-5.87-5.87 34.28-34.31L73 27.28z"
      id="bsLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'wifi-excellent':
return `<svg xmlns="http://www.w3.org/2000/svg" width="12.852" height="10.101" viewBox="0 0 15.852 12.101">
  <g id="Group_197" data-name="Group 197" transform="translate(-1409 -1213.41)">
    <path id="Path_460" d="M1415.02 1223.255l1.923 2.256 1.933-2.267a3.72 3.72 0 0 0-3.856.011z" fill="#c5e1ff"
      data-name="Path 460" />
    <path id="Path_461" d="M1409 1216.047l1.613 2.192a10.556 10.556 0 0 1 12.633-.021l1.606-2.2a13.281 13.281 0 0 0-15.852.025z"
      fill="#c5e1ff" data-name="Path 461" />
    <path id="Path_462" d="M1421.446 1219.3a9.2 9.2 0 0 0-9 0c-.176.1-.35.2-.522.305l1.436 2.311c.129-.081.259-.156.391-.228a6.465 6.465 0 0 1 6.4 0l.189.1c.1.051.214.111.267.141l1.392-2.337a9.558 9.558 0 0 0-.4-.216z"
      fill="#c5e1ff" data-name="Path 462" />
  </g>
</svg>
`;
case 'wifi-mid':
return `<svg xmlns="http://www.w3.org/2000/svg" width="12.852" height="10.101" viewBox="0 0 15.852 12.101">
  <g id="Group_198" data-name="Group 198" transform="translate(-1451.905 -1213.41)">
    <path id="Path_463" d="M1457.925 1223.255l1.923 2.256 1.933-2.267a3.72 3.72 0 0 0-3.856.011z" fill="#c5e1ff"
      data-name="Path 463" />
    <path id="Path_464" d="M1451.905 1216.047l1.612 2.192a10.556 10.556 0 0 1 12.633-.021l1.607-2.2a13.281 13.281 0 0 0-15.852.025z"
      fill="#4a6170" data-name="Path 464" />
    <path id="Path_465" d="M1464.351 1219.3a9.2 9.2 0 0 0-9 0c-.177.1-.35.2-.523.305l1.437 2.311c.129-.081.259-.156.391-.228a6.465 6.465 0 0 1 6.4 0l.189.1c.1.051.214.111.266.141l1.393-2.337a10.25 10.25 0 0 0-.4-.216z"
      fill="#c5e1ff" data-name="Path 465" />
  </g>
</svg>
`;
case 'wifi-low':
return `<svg xmlns="http://www.w3.org/2000/svg" width="12.852" height="10.941" viewBox="0 0 15.852 12.941">
  <g id="Group_199" data-name="Group 199" transform="translate(-1492.628 -1213.41)">
    <path id="Path_466" d="M1497.862 1223.173l2.709 3.178 2.741-3.214-.5-.342a4.24 4.24 0 0 0-4.5.029z" fill="#ff4d6a"
      data-name="Path 466" />
    <path id="Path_467" d="M1492.628 1216.047l1.613 2.192a10.556 10.556 0 0 1 12.633-.021l1.606-2.2a13.281 13.281 0 0 0-15.852.025z"
      fill="#4a6170" data-name="Path 467" />
    <path id="Path_468" d="M1505.074 1219.3a9.2 9.2 0 0 0-9 0c-.176.1-.35.2-.522.305l1.436 2.311c.129-.081.259-.156.391-.228a6.465 6.465 0 0 1 6.4 0l.189.1c.1.051.214.111.267.141l1.392-2.337a9.558 9.558 0 0 0-.4-.216z"
      fill="#4a6170" data-name="Path 468" />
  </g>
</svg>
`;
case 'wifi-signal-full':
return `<svg viewBox="0 0 14.53 11.09" id="wifi-signal-full" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M5.52 9l1.76 2.06L9.05 9a3.39 3.39 0 0 0-3.53 0zM0 2.42l1.48 2a9.65 9.65 0 0 1 11.58 0l1.47-2A12.18 12.18 0 0 0 0 2.42z" />
      <path fill="currentColor" d="M11.41 5.4a8.42 8.42 0 0 0-8.25 0 5.5 5.5 0 0 0-.48.28L4 7.8l.36-.21a5.91 5.91 0 0 1 5.87 0l.17.09.24.13 1.28-2.14-.37-.2z" />
    </g>
  </g>
</svg>`;

case 'avatar':
return `<svg viewBox="0 0 65.99 79.97" id="avatar" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M59.34 64.56L45 57.35a5.5 5.5 0 0 1-3-4.92v-5.65c.39-.46.86-1.06 1.35-1.76a33.5 33.5 0 0 0 4.46-9A4.51 4.51 0 0 0 51 31.69v-6a4.51 4.51 0 0 0-1.49-3.35v-8.76S51.28 0 33 0 16.5 13.58 16.5 13.58v8.73a4.5 4.5 0 0 0-1.5 3.35v6a4.53 4.53 0 0 0 2.07 3.8 30.13 30.13 0 0 0 5.43 11.3v5.54a5.51 5.51 0 0 1-2.85 4.82L6.27 64.47A12.11 12.11 0 0 0 0 75.08V80h66v-4.62a12.08 12.08 0 0 0-6.64-10.82z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'internet':
return `<svg viewBox="0 0 54.67 54.67" id="internet" width="${size ? size : '2.53vw'}" height="${size ? size : '2.53vw'}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M12.76 27.33a49.38 49.38 0 0 1 .45-6.67H.83A27.22 27.22 0 0 0 .83 34h12.38a49.27 49.27 0 0 1-.45-6.67zm24.15 0a45 45 0 0 0-.51-6.67H18.26a44.74 44.74 0 0 0 0 13.34H36.4a44.77 44.77 0 0 0 .51-6.67zM52 15.66A27.41 27.41 0 0 0 34.36.92a50 50 0 0 1 6.16 14.74zM41.91 27.33a51 51 0 0 1-.45 6.67h12.38a27.22 27.22 0 0 0 0-13.34H41.46a51.07 51.07 0 0 1 .45 6.67zm-6.55-11.67A44.94 44.94 0 0 0 27.67 0H27a44.94 44.94 0 0 0-7.69 15.65zM19.31 39A44.9 44.9 0 0 0 27 54.66h.67A44.9 44.9 0 0 0 35.36 39zm-5.17-23.34A50.23 50.23 0 0 1 20.3.92 27.39 27.39 0 0 0 2.63 15.66zM40.52 39a49.91 49.91 0 0 1-6.16 14.75A27.43 27.43 0 0 0 52 39zM2.63 39A27.38 27.38 0 0 0 20.3 53.75 50.17 50.17 0 0 1 14.14 39z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'signal_no':
return `<svg viewBox="0 0 11 13.56" id="signal_no" width="11" height="13.6">
  <defs>
    <style>
      .cls-1-no {
        fill: #ff4d6a;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_10" data-name="Layer 10">
      <polygon class="cls-1-no" points="9 0 9 8.2 10.62 11 11 11 11 0 9 0" />
      <polygon class="cls-1-no" points="9 10.2 9 10.2 8 8.46 8 8.46 6 5 6 5 3.37 0.44 1.63 1.44 4.27 6 4.27 6 5 7.27 5 7.27 6 9 6 9 6.94 10.63 8.63 13.56 10.37 12.56 9.05 10.29 9 10.2" />
      <polygon class="cls-1-no" points="3 6 3 11 5 11 5 9.27 3.11 6 3 6" />
      <polygon class="cls-1-no" points="8 3 6 3 8 6.46 8 3" />
      <rect class="cls-1-no" y="8" width="2" height="3" />
    </g>
  </g>
</svg>`;
case 'signal_full':
return `<svg viewBox="0 0 11 11" id="signal_full "width="11" height="11">
  <defs>
    <style>
      .cls-1-full {
        fill: #c2e1ff;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_10" data-name="Layer 10">
      <rect class="cls-1-full" x="3" y="6" width="2" height="5" />
      <rect class="cls-1-full" y="8" width="2" height="3" />
      <rect class="cls-1-full" x="6" y="3" width="2" height="8" />
      <rect class="cls-1-full" x="9" width="2" height="11" />
    </g>
  </g>
</svg>`;
case 'signal_full_inactive':
return `<svg viewBox="0 0 11 11" id="signal_full_inactive" width="11" height="13.6">
  <defs>
    <style>
      .cls-1-inactive {
        fill: rgba(196, 225, 255, 0.4);
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_10" data-name="Layer 10">
      <rect class="cls-1-inactive" x="3" y="6" width="2" height="5" />
      <rect class="cls-1-inactive" y="8" width="2" height="3" />
      <rect class="cls-1-inactive" x="6" y="3" width="2" height="8" />
      <rect class="cls-1-inactive" x="9" width="2" height="11" />
    </g>
  </g>
</svg>`;
case 'signal_low':
return `<svg viewBox="0 0 11 11" id="signal_low" width="11" height="11">
  <defs>
    <style>
      .cls-1-low {
        fill: #4a6170;
      }

      .cls-2-low {
        fill: #ff4d6a;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_10" data-name="Layer 10">
      <rect class="cls-1-low" x="3" y="6" width="2" height="5" />
      <rect class="cls-2-low" y="8" width="2" height="3" />
      <rect class="cls-1-low" x="6" y="3" width="2" height="8" />
      <rect class="cls-1-low" x="9" width="2" height="11" />
    </g>
  </g>
</svg>`;
case 'signal_middle':
return `<svg viewBox="0 0 11 11" id="signal_middle" "width="11" height="11">
  <defs>
    <style>
      .cls-1-middle {
        fill: #c5e1ff;
      }

      .cls-2-middle {
        fill: #4a6170;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_10" data-name="Layer 10">
      <rect class="cls-1-middle" x="3" y="6" width="2" height="5" />
      <rect class="cls-1-middle" y="8" width="2" height="3" />
      <rect class="cls-2-middle" x="6" y="3" width="2" height="8" />
      <rect class="cls-2-middle" x="9" width="2" height="11" />
    </g>
  </g>
</svg>`;
case 'signal_high':
return `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
<g id="Group_193" data-name="Group 193" transform="translate(-1442 -1191)">
    <path id="Rectangle_358" d="M0 0h2v5H0z" fill="#c5e1ff" data-name="Rectangle 358" transform="translate(1445 1197)"/>
    <path id="Rectangle_359" d="M0 0h2v3H0z" fill="#c5e1ff" data-name="Rectangle 359" transform="translate(1442 1199)"/>
    <path id="Rectangle_360" d="M0 0h2v8H0z" fill="#c5e1ff" data-name="Rectangle 360" transform="translate(1448 1194)"/>
    <path id="Rectangle_361" d="M0 0h2v11H0z" fill="#4a6170" data-name="Rectangle 361" transform="translate(1451 1191)"/>
</g>
</svg>
`
case 'target_pending':
return `<svg viewBox="0 0 16 16" id="target" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm.5 15v-1.58h-1V15A7 7 0 0 1 1 8.5h2v-1H1A7 7 0 0 1 7.5 1v1.92h1V1A7 7 0 0 1 15 7.5h-2v1h2A7 7 0 0 1 8.5 15z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'target_in_progress':
return `<svg viewBox="0 0 16 16" id="target" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="#6cfff8" d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm.5 15v-1.58h-1V15A7 7 0 0 1 1 8.5h2v-1H1A7 7 0 0 1 7.5 1v1.92h1V1A7 7 0 0 1 15 7.5h-2v1h2A7 7 0 0 1 8.5 15z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`
case 'device-failed':
return `<svg viewBox="0 0 15.51 13.18" id="device-failed" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <rect fill="currentColor" fill="#ff4d6a" x="7.26" y="5.18" width="1" height="3" rx=".3" ry=".3" />
      <rect fill="currentColor" fill="#ff4d6a" x="7.26" y="9.18" width="1" height="1" rx=".3" ry=".3" />
      <path fill="currentColor" fill="#ff4d6a" d="M15.4 12L8.44.36a.83.83 0 0 0-1.37 0L.11 12a.8.8 0 0 0 .69 1.18h13.91a.81.81 0 0 0 .7-.41.79.79 0 0 0-.01-.77zm-14.25.21l6.61-11 6.6 11z" />
    </g>
  </g>
</svg>`;
case 'failed':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size: 15}" height="${size ? size: 15}" viewBox="0 0 25 36">
  <g id="Group_153" data-name="Group 153" transform="translate(-1376 -1496)">
    <path id="Path_348" d="M1385 1504h-8a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-18l-1-.75V1525h-15v-20h7.5zm-.5 26a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
      fill="#6a8699" data-name="Path 348" />
    <path id="Path_349" d="M1392.5 1496a8.5 8.5 0 1 0 8.5 8.5 8.5 8.5 0 0 0-8.5-8.5zm0 15.938a7.445 7.445 0 1 1 7.437-7.438 7.438 7.438 0 0 1-7.437 7.438z"
      fill="#ff4d6a" data-name="Path 349" />
    <path id="Rectangle_345" d="M0 0h7v1H0z" fill="#ff4d6a" data-name="Rectangle 345" transform="rotate(90 -53.5 1446.5)" />
    <path id="Rectangle_346" d="M0 0h1v1H0z" fill="#ff4d6a" data-name="Rectangle 346" transform="rotate(90 -57.5 1450.5)" />
  </g>
</svg>
`
case 'in_progress':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : 15}" height="${size ? size : 15}" viewBox="0 0 25 36">
  <g id="Group_152" data-name="Group 152" transform="translate(-1318 -1497)">
    <path id="Path_346" d="M1327 1505h-8a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-18l-1-.75V1526h-15v-20h7.5zm-.5 26a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
      fill="#a7cff7" data-name="Path 346" />
    <path id="Path_347" d="M1334.5 1497a8.5 8.5 0 1 0 8.5 8.5 8.5 8.5 0 0 0-8.5-8.5zm.5 15.912V1510h-1v2.912a7.426 7.426 0 0 1-6.912-6.912H1330v-1h-2.912a7.287 7.287 0 0 1 .126-1 7.4 7.4 0 0 1 1.547-3.232 7.492 7.492 0 0 1 1.008-1.008 7.393 7.393 0 0 1 4.231-1.676V1501h1v-2.915a7.393 7.393 0 0 1 4.231 1.676 7.464 7.464 0 0 1 2.122 2.844 7.4 7.4 0 0 1 .433 1.4 7.287 7.287 0 0 1 .126 1H1339v1h2.912a7.426 7.426 0 0 1-6.912 6.907z"
      fill="#6cfff8" data-name="Path 347" />
    <circle id="Ellipse_58" cx="1.5" cy="1.5" r="1.5" fill="#6cfff8" data-name="Ellipse 58" transform="translate(1333 1504)" />
  </g>
</svg>`

case 'user':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : 21}" height="${size ? size : 21}">
  <path fill="#C5E1FF" fill-rule="evenodd" d="M10.499.001C4.71.001 0 4.711 0 10.5c0 5.789 4.71 10.499 10.499 10.499 5.79 0 10.499-4.71 10.499-10.499 0-5.789-4.709-10.499-10.499-10.499zm0 19.644a9.117 9.117 0 0 1-6.807-3.049c-.513-.572-.293-1.51.433-1.761a.088.088 0 0 0 .015-.005c.055-.018 3.59-.921 4.095-1.925.231-.459.003-1.047-.227-1.452a6.95 6.95 0 0 1-.307-.45l-.001-.001c-.599-.958-1.055-2.219-1.102-3.777-.07-2.344 1.744-4.247 3.896-4.253h.01c2.154.006 3.967 1.909 3.897 4.253-.046 1.558-.503 2.819-1.102 3.777v.001a6.958 6.958 0 0 1-.308.45c-.23.405-.458.993-.227 1.452.506 1.004 4.041 1.907 4.095 1.925l.014.005c.727.251.947 1.188.434 1.761a9.123 9.123 0 0 1-6.808 3.049z" />
</svg>
`
case 'settings':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : 23}" height="${size ? size : 23}">
  <path fill="#C5E1FF" fill-rule="evenodd" d="M20.699 9.82a9.204 9.204 0 0 0-1.519-3.635l1.454-1.807-2.026-2.02-1.825 1.46a9.265 9.265 0 0 0-3.627-1.469L12.896 0H10.03l-.263 2.377a9.279 9.279 0 0 0-3.496 1.458L4.422 2.358l-2.026 2.02 1.479 1.841A9.205 9.205 0 0 0 2.382 9.81L0 10.072v2.856l2.385.263a9.216 9.216 0 0 0 1.487 3.566l-1.469 1.828 2.026 2.02 1.835-1.466a9.278 9.278 0 0 0 3.502 1.464L10.03 23h2.866l.261-2.369a9.287 9.287 0 0 0 3.612-1.459l1.839 1.47 2.026-2.02-1.461-1.816a9.23 9.23 0 0 0 1.523-3.626L23 12.928v-2.856l-2.301-.252zM11.5 15.467A3.974 3.974 0 0 1 7.52 11.5a3.974 3.974 0 0 1 3.98-3.967 3.974 3.974 0 0 1 3.98 3.967 3.974 3.974 0 0 1-3.98 3.967z" />
</svg>
`
case 'exclamation-mark':
return `<svg viewBox="0 0 15 10" id="exclamation-mark" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <rect fill="currentColor" stroke="#ff4d6a" x="7.13" y="2.25" width=".73" height="4.2" rx=".33" ry=".33" />
      <rect fill="currentColor" stroke="#ff4d6a" x="7.13" y="7.14" width=".73" height="1" rx=".37" ry=".37" />
      <path fill="currentColor" stroke="#ff4d6a" d="M7.5 10.72a5.36 5.36 0 1 1 5.36-5.36 5.37 5.37 0 0 1-5.36 5.36zm0-10a4.62 4.62 0 1 0 4.62 4.62A4.62 4.62 0 0 0 7.5.74z" />
    </g>
  </g>
</svg>`;
case 'app-general':
return `<svg viewBox="0 0 13 13" id="app-general" width="${size ? size : '3vw'}" height="${size ? size : '3vw'}">
  <g id="bLayer_2" data-name="Layer 2">
    <g id="bLayer_1-2" data-name="Layer 1">
      <rect fill="currentColor" width="6" height="6" rx=".26" ry=".26" />
      <rect fill="currentColor" x="7" width="6" height="6" rx=".26" ry=".26" />
      <rect fill="currentColor" y="7" width="6" height="6" rx=".26" ry=".26" />
      <rect fill="currentColor" x="7" y="7" width="6" height="6" rx=".26" ry=".26" />
    </g>
  </g>
</svg>`;
case 'downloading-app':
return `<svg viewBox="0 0 19.27 19.27" id="downloading-app" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M9.27 0v.73A9.27 9.27 0 1 0 18.54 10h.73a10 10 0 0 0-10-10zm0 18.73a8.73 8.73 0 0 1 0-17.46V2a8 8 0 0 1 8 8H18a8.74 8.74 0 0 1-8.73 8.73z" />
      <path fill="currentColor" d="M6.27 7h6v6h-6z" />
    </g>
  </g>
</svg>`;
case 'downloading-arrow':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : ''}" height="${size ? size : ''}" viewBox="0 0 11 12.91">
  <path id="download" fill="#c4e1ff" fill-rule="evenodd" d="M1176,1836h3v7h-3v-7Zm6.99,7-5.49,5.91-5.49-5.91" transform="translate(-1172 -1836)" />
</svg>`;
case 'executing_1':
return `<svg viewBox="0 0 19.27 19.27" id="executing_1" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M9.27 0v.73A9.27 9.27 0 1 0 18.54 10h.73a10 10 0 0 0-10-10zm0 18.73a8.73 8.73 0 0 1 0-17.46V2a8 8 0 0 1 8 8H18a8.74 8.74 0 0 1-8.73 8.73z" />
      <path fill="currentColor" d="M6.27 7h6v6h-6z" />
    </g>
  </g>
</svg>`;
case 'draining':
return `<svg viewBox="0 0 19.27 19.27" id="draining" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M9.27 0v.73A9.27 9.27 0 1 0 18.54 10h.73a10 10 0 0 0-10-10zm0 18.73a8.73 8.73 0 0 1 0-17.46V2a8 8 0 0 1 8 8H18a8.74 8.74 0 0 1-8.73 8.73z" />
      <path fill="currentColor" d="M6.27 7h6v6h-6z" />
    </g>
  </g>
</svg>`;
case 'fetch':
return `<svg viewBox="0 0 19 19" id="fetch" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="fLayer_2" data-name="Layer 2">
    <g id="fLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M11.66 11.82H10V5.3a.29.29 0 0 0-.3-.3h-.4a.29.29 0 0 0-.3.3v6.52H7.34a.22.22 0 0 0-.15.37l2.16 2.16a.22.22 0 0 0 .3 0l2.16-2.16a.22.22 0 0 0-.15-.37z" />
      <path fill="currentColor" d="M9.5 0A9.5 9.5 0 1 0 19 9.5 9.5 9.5 0 0 0 9.5 0zm0 18A8.5 8.5 0 1 1 18 9.5 8.51 8.51 0 0 1 9.5 18z" />
    </g>
  </g>
</svg>`;
case 'play':
return `<svg viewBox="0 0 19.27 19.27" id="play" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="cLayer_2" data-name="Layer 2">
    <g id="cLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M9.27 0v.73A9.27 9.27 0 1 0 18.54 10h.73a10 10 0 0 0-10-10zm0 18.73a8.73 8.73 0 0 1 0-17.46V2a8 8 0 0 1 8 8H18a8.74 8.74 0 0 1-8.73 8.73z" />
      <path fill="currentColor" d="M7.61 13.4l5.44-3.4-5.44-3.4" />
    </g>
  </g>
</svg>`;
case 'complete':
return `<svg viewBox="0 0 19 21.58" id="complete" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M19 11.58h-1v.5A8.5 8.5 0 1 1 9 3.6v2.49a.3.3 0 0 0 .51.22l2.9-2.9a.29.29 0 0 0 0-.42L9.51.09A.3.3 0 0 0 9 .3v2.3a9.5 9.5 0 1 0 10 9.48v-.5z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'waiting':
return `<svg viewBox="0 0 25 20" id="waiting" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="lLayer_2" data-name="Layer 2">
    <g id="lLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M15.5 1a9.37 9.37 0 0 0-4.28 1 6.49 6.49 0 1 0-4.88 11A9.5 9.5 0 1 0 15.5 1zM1 6.5A5.5 5.5 0 1 1 6.5 12 5.51 5.51 0 0 1 1 6.5zM15.5 19a8.5 8.5 0 0 1-8.13-6.07 6.49 6.49 0 0 0 4.5-10.09A8.35 8.35 0 0 1 15.5 2a8.5 8.5 0 0 1 0 17z" />
      <path fill="currentColor" d="M9.7 7a.29.29 0 0 0 .3-.3v-.4a.29.29 0 0 0-.3-.3H7V3.3a.29.29 0 0 0-.3-.3h-.4a.29.29 0 0 0-.3.3v3.4a.29.29 0 0 0 .3.3h3.4z" />
    </g>
  </g>
</svg>`;
case 'created':
return `<svg viewBox="0 0 22.04 18.54" id="created" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M12.77 0a9.16 9.16 0 0 0-5.08 1.53A4.67 4.67 0 0 0 4.77.5a4.76 4.76 0 0 0-1.25 9.36 9.13 9.13 0 0 0 9.25 8.68 9.27 9.27 0 0 0 0-18.54zM.54 5.27A4.23 4.23 0 1 1 4.77 9.5 4.24 4.24 0 0 1 .54 5.27zM12.77 18a8.69 8.69 0 0 1-8.69-8 3.94 3.94 0 0 0 .69.07 4.77 4.77 0 0 0 3.37-8.18A8.72 8.72 0 1 1 12.77 18z" />
      <path fill="currentColor" d="M6.74 3.19l-.43-.34L4.64 5H2.52v.54h2.39l1.83-2.35z" />
    </g>
  </g>
</svg>`;
case 'commited':
return `<svg viewBox="0 0 22.04 18.54" id="commited" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M12.77 0a9.16 9.16 0 0 0-5.08 1.53A4.67 4.67 0 0 0 4.77.5a4.76 4.76 0 0 0-1.25 9.36 9.13 9.13 0 0 0 9.25 8.68 9.27 9.27 0 0 0 0-18.54zM.54 5.27A4.23 4.23 0 1 1 4.77 9.5 4.24 4.24 0 0 1 .54 5.27zM12.77 18a8.69 8.69 0 0 1-8.69-8 3.94 3.94 0 0 0 .69.07 4.77 4.77 0 0 0 3.37-8.18A8.72 8.72 0 1 1 12.77 18z" />
      <path fill="currentColor" d="M6.74 3.19l-.43-.34L4.64 5H2.52v.54h2.39l1.83-2.35z" />
    </g>
  </g>
</svg>`;
case 'delivered':
return `<svg viewBox="0 0 22.04 18.54" id="delivered" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M12.77 0a9.16 9.16 0 0 0-5.08 1.53A4.67 4.67 0 0 0 4.77.5a4.76 4.76 0 0 0-1.25 9.36 9.13 9.13 0 0 0 9.25 8.68 9.27 9.27 0 0 0 0-18.54zM.54 5.27A4.23 4.23 0 1 1 4.77 9.5 4.24 4.24 0 0 1 .54 5.27zM12.77 18a8.69 8.69 0 0 1-8.69-8 3.94 3.94 0 0 0 .69.07 4.77 4.77 0 0 0 3.37-8.18A8.72 8.72 0 1 1 12.77 18z" />
      <path fill="currentColor" d="M6.74 3.19l-.43-.34L4.64 5H2.52v.54h2.39l1.83-2.35z" />
    </g>
  </g>
</svg>`;
case 'acked':
return `<svg viewBox="0 0 22.04 18.54" id="acked" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M12.77 0a9.16 9.16 0 0 0-5.08 1.53A4.67 4.67 0 0 0 4.77.5a4.76 4.76 0 0 0-1.25 9.36 9.13 9.13 0 0 0 9.25 8.68 9.27 9.27 0 0 0 0-18.54zM.54 5.27A4.23 4.23 0 1 1 4.77 9.5 4.24 4.24 0 0 1 .54 5.27zM12.77 18a8.69 8.69 0 0 1-8.69-8 3.94 3.94 0 0 0 .69.07 4.77 4.77 0 0 0 3.37-8.18A8.72 8.72 0 1 1 12.77 18z" />
      <path fill="currentColor" d="M6.74 3.19l-.43-.34L4.64 5H2.52v.54h2.39l1.83-2.35z" />
    </g>
  </g>
</svg>`;
case 'move-to-reign-device':
return `<svg viewBox="0 0 15 15" id="move-to-reign-device" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="jLayer_2" data-name="Layer 2">
    <g id="jLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M14.71 0H9.29A.29.29 0 0 0 9 .29v1.42a.29.29 0 0 0 .29.29h2.3l-5 5a.35.35 0 0 0 0 .5l.92.92a.35.35 0 0 0 .5 0l5-5.05v2.3a.29.29 0 0 0 .29.29h1.42a.29.29 0 0 0 .28-.25V.29a.29.29 0 0 0-.29-.29z" />
      <path fill="currentColor" d="M13 10.3V13H2V2h3.7a.29.29 0 0 0 .3-.3V.3a.29.29 0 0 0-.3-.3H.3a.29.29 0 0 0-.3.3v14.4a.29.29 0 0 0 .3.3h14.4a.29.29 0 0 0 .3-.3v-4.4a.29.29 0 0 0-.3-.3h-1.4a.29.29 0 0 0-.3.3z" />
    </g>
  </g>
</svg>`;
case 'more-photos':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_10" data-name="Layer 10">
      <path fill="#c5e1ff" d="M12.41,0H3.59A1.59,1.59,0,0,0,2,1.59V2H1.59A1.59,1.59,0,0,0,0,3.59v8.82A1.59,1.59,0,0,0,1.59,14h8.82A1.59,1.59,0,0,0,12,12.41V12h.41A1.59,1.59,0,0,0,14,10.41V1.59A1.59,1.59,0,0,0,12.41,0ZM11,12.41a.6.6,0,0,1-.59.59H1.59A.6.6,0,0,1,1,12.41V3.59A.6.6,0,0,1,1.59,3H2v7.41A1.59,1.59,0,0,0,3.59,12H11ZM13,7,11.7,5.7a.77.77,0,0,0-1.09,0l-2.95,3L6.07,7.07a1.06,1.06,0,0,0-1.49,0L3,8.65V1.59A.6.6,0,0,1,3.59,1h8.82a.6.6,0,0,1,.59.59Z" />
      <circle fill="#c5e1ff" cx="7.25" cy="3.75" r="1.25" />
    </g>
  </g>
</svg>`
case 'reign-completed':
return `<svg viewBox="0 0 11.37 17.46" id="reign-completed" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bLayer_2" data-name="Layer 2">
    <g id="bLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M11 5.81a.4.4 0 0 0-.4.4v1.25H3.93V.83H5.5a.4.4 0 0 0 0-.8h-2a.4.4 0 0 0-.4.4v3H.56A.56.56 0 0 0 0 4v12.9a.56.56 0 0 0 .56.56h6.88A.56.56 0 0 0 8 16.9V8.26h3a.39.39 0 0 0 .4-.4V6.21a.4.4 0 0 0-.4-.4zM4 16.46a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm3.28-3H.72V4.19h2.41v3.67a.39.39 0 0 0 .4.4h3.75z" />
      <path fill="currentColor" d="M8.28.8H10L5.85 4.92a.42.42 0 0 0 0 .57.39.39 0 0 0 .29.11.38.38 0 0 0 .28-.11l4.12-4.12v1.91a.4.4 0 0 0 .8 0V.4a.36.36 0 0 0-.06-.2.47.47 0 0 0-.18-.2.4.4 0 0 0-.15 0H8.28a.4.4 0 0 0 0 .8z" />
    </g>
  </g>
</svg>`;
case 'executing':
return `<svg viewBox="0 0 18.54 18.54" id="executing" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="cLayer_2" data-name="Layer 2">
    <g id="cLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M9.27 0a9.27 9.27 0 1 0 9.27 9.27A9.28 9.28 0 0 0 9.27 0zm0 18A8.73 8.73 0 1 1 18 9.27 8.74 8.74 0 0 1 9.27 18z" />
      <path fill="currentColor" d="M6.27 6.27h6v6h-6z" />
    </g>
  </g>
</svg>`;
case 'atack-ad':
return `<svg viewBox="0 0 24.33 17.21" id="atack-ad" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M23.68 0H.64A.64.64 0 0 0 0 .64v15.93a.64.64 0 0 0 .64.64h23a.65.65 0 0 0 .65-.64V.64a.65.65 0 0 0-.61-.64zM23 15.92H1.29V1.29H23z" />
      <path fill="currentColor" d="M6 10.71h4l.76 2.6h1.16L9.16 3.92a.48.48 0 0 0-.46-.35H7.21a.48.48 0 0 0-.46.35l-2.7 9.39h1.17zm1.7-6.09h.49l1.44 5H6.26zm5.82 8.69h3.2c2.33 0 3.51-1.68 3.51-5 0-3.15-1.18-4.74-3.51-4.74h-3.2a.39.39 0 0 0-.39.39v9a.4.4 0 0 0 .39.35zm.77-8.62h2.43c1.56 0 2.32 1.2 2.32 3.66 0 2.65-.76 3.93-2.32 3.93H14.29z" />
    </g>
  </g>
</svg>`;
case 'atack-browser':
return `<svg viewBox="0 0 24.33 17.21" id="atack-browser" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="bLayer_2" data-name="Layer 2">
    <g id="bLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M23.68 0H.64A.64.64 0 0 0 0 .64v15.93a.64.64 0 0 0 .64.64h23a.65.65 0 0 0 .65-.64V.64a.65.65 0 0 0-.61-.64zM23 1.29V4.8H1.29V1.29zM1.29 15.92V6.09H23v9.83z" />
      <path fill="currentColor" d="M2.83 3.73h.45a.65.65 0 0 0 0-1.29h-.45a.65.65 0 0 0 0 1.29zm2.66 0h.45a.65.65 0 0 0 0-1.29h-.45a.65.65 0 0 0 0 1.29zm2.66 0h.44a.65.65 0 1 0 0-1.29h-.44a.65.65 0 0 0 0 1.29z" />
    </g>
  </g>
</svg>`;
case 'atack-message':
return `<svg viewBox="0 0 28.11 17.21" id="atack-message" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="cLayer_2" data-name="Layer 2">
    <g id="cLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M27.46 0h-23a.64.64 0 0 0-.64.64v8c0 .18 0 4.4-3.14 4.4a.64.64 0 0 0-.26 1.23 10.58 10.58 0 0 0 3.4.89v1.44a.64.64 0 0 0 .64.64h23a.65.65 0 0 0 .65-.64V.64a.65.65 0 0 0-.65-.64zm-.64 15.92H5.07v-1.46a.64.64 0 0 0-.22-.46.7.7 0 0 0-.52-.15 4.14 4.14 0 0 1-1.53-.13c1.75-1.13 2.27-3.6 2.27-5.08V1.29h21.75z" />
      <path fill="currentColor" d="M8 4.81h15.1a.65.65 0 1 0 0-1.29H8a.65.65 0 1 0 0 1.29zm0 2.8h15.1a.65.65 0 1 0 0-1.29H8a.65.65 0 1 0 0 1.29zm0 2.8h7.27a.65.65 0 0 0 0-1.29H8a.65.65 0 1 0 0 1.29z" />
    </g>
  </g>
</svg>`;
case 'atack-telegram':
return `<svg viewBox="0 0 17.21 17.21" id="atack-telegram" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="dLayer_2" data-name="Layer 2">
    <g id="dLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M3.58 8.92l2.06.69.77 2.39a.32.32 0 0 0 .24.21l.2-2.05 3.23 2.34a.46.46 0 0 0 .72-.28l1.37-6.58a.35.35 0 0 0-.48-.4L3.57 8.39a.28.28 0 0 0 .01.53z" />
      <path fill="currentColor" d="M6.65 12.21a.31.31 0 0 0 .24-.07l1.24-1-1.3-.94z" />
      <path fill="currentColor" d="M16.57 0H.64A.64.64 0 0 0 0 .64v15.93a.64.64 0 0 0 .64.64h15.93a.64.64 0 0 0 .64-.64V.64a.64.64 0 0 0-.64-.64zm-.65 15.92H1.29V1.29h14.63z" />
    </g>
  </g>
</svg>`;
case 'atack-whatsapp':
return `<svg viewBox="0 0 17.21 17.21" id="atack-whatsapp" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M6.65 12a4.16 4.16 0 1 0-2.17-3.63 4.11 4.11 0 0 0 .6 2.15l-.76 2.24zM7 6.59a.39.39 0 0 1 .28-.12h.2c.06 0 .14 0 .23.17s.29.71.29.76a.19.19 0 0 1 0 .18.59.59 0 0 1-.1.17l-.15.18c0 .05-.11.11 0 .21a3.25 3.25 0 0 0 .57.71 2.91 2.91 0 0 0 .83.51c.11.05.17 0 .23 0s.25-.3.32-.4.14-.08.24 0 .6.28.7.33a.64.64 0 0 1 .2.12 1 1 0 0 1-.06.49 1 1 0 0 1-.7.48c-.19 0-.19.16-1.24-.25A4.32 4.32 0 0 1 7.05 8.5a1.94 1.94 0 0 1-.42-1A1.18 1.18 0 0 1 7 6.59z" />
      <path fill="currentColor" d="M16.57 0H.64A.64.64 0 0 0 0 .64v15.93a.64.64 0 0 0 .64.64h15.93a.64.64 0 0 0 .64-.64V.64a.64.64 0 0 0-.64-.64zm-.65 15.92H1.29V1.29h14.63z" />
    </g>
  </g>
</svg>`;
case 'browsing':
return `<svg viewBox="0 0 13.08 13.08" id="browsing" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="aLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M6.54 0a6.54 6.54 0 0 0 0 13.08A6.54 6.54 0 0 0 6.54 0zM.74 6.9H3.1a11 11 0 0 0 .3 2.36h-2A5.72 5.72 0 0 1 .74 6.9zM6.9 3.08V.78a3.48 3.48 0 0 1 1.81 2.3zm2 .73a10.28 10.28 0 0 1 .32 2.37H6.9V3.81zM6.18.78v2.3H4.36A3.44 3.44 0 0 1 6.18.78zm0 3v2.4H3.83a11 11 0 0 1 .31-2.37zM3.1 6.18H.74a6.11 6.11 0 0 1 .66-2.37h2a11 11 0 0 0-.3 2.37zm.73.72h2.35v2.36h-2a10.13 10.13 0 0 1-.35-2.36zM6.18 10v2.3A3.49 3.49 0 0 1 4.36 10zm.72 2.3V10h1.81a3.38 3.38 0 0 1-1.81 2.29zm0-3V6.9h2.35a11.4 11.4 0 0 1-.32 2.36zM10 6.9h2.35a5.85 5.85 0 0 1-.66 2.36h-2A10.89 10.89 0 0 0 10 6.9zm0-.72a11.72 11.72 0 0 0-.3-2.37h2a5.63 5.63 0 0 1 .66 2.37zm1.22-3.1H9.48a6.24 6.24 0 0 0-1-2 5.74 5.74 0 0 1 2.72 2zm-6.56-2a6.16 6.16 0 0 0-1 2H1.87a5.76 5.76 0 0 1 2.77-2.03zM1.87 10h1.72a6 6 0 0 0 1 2 5.72 5.72 0 0 1-2.72-2zm6.57 2a6.3 6.3 0 0 0 1-2h1.76a5.69 5.69 0 0 1-2.76 2z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'browsing_secured':
return `<svg viewBox="0 0 17.66 16.08" id="browsing_secured" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bLayer_2" data-name="Layer 2">
    <g id="bLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M12.3 0a5.34 5.34 0 0 0-4.83 3.08A5.84 5.84 0 0 0 6.54 3 6.54 6.54 0 1 0 13 10.65 5.35 5.35 0 0 0 12.3 0zM4.64 4.05a6.16 6.16 0 0 0-1 2H1.87a5.76 5.76 0 0 1 2.77-2zM1.4 6.81h2a11 11 0 0 0-.3 2.37H.74a6.11 6.11 0 0 1 .66-2.37zM.74 9.9H3.1a11 11 0 0 0 .3 2.37h-2A5.81 5.81 0 0 1 .74 9.9zM1.87 13h1.72a6 6 0 0 0 1 2 5.72 5.72 0 0 1-2.72-2zm4.31 2.3A3.47 3.47 0 0 1 4.36 13h1.82zm0-3h-2a10.29 10.29 0 0 1-.35-2.4h2.35zm0-3.09H3.83a11 11 0 0 1 .31-2.37h2zm0-3.1H4.36a3.42 3.42 0 0 1 1.82-2.32zm.72-2.32a1 1 0 0 1 .26.12 5.29 5.29 0 0 0-.22 1.45 5.49 5.49 0 0 0 .06.72h-.1zm0 3h.26a5.31 5.31 0 0 0 1.39 2.39H6.9zm0 3.09h2.35a11.59 11.59 0 0 1-.32 2.37h-2zm0 5.39V13h1.81a3.38 3.38 0 0 1-1.81 2.29zM8.44 15a6.3 6.3 0 0 0 1-2h1.76a5.69 5.69 0 0 1-2.76 2zm3.23-2.76h-2a11.58 11.58 0 0 0 .33-2.08 5.24 5.24 0 0 0 2.23.55 5.85 5.85 0 0 1-.56 1.56zm.63-2.46a4.45 4.45 0 1 1 4.45-4.45 4.46 4.46 0 0 1-4.45 4.48z" />
      <path fill="currentColor" d="M13.71 4a1.41 1.41 0 1 0-2.82 0v1.36h-1v2.82h4.71V5.36h-.94zM13 5.36h-1.39V4A.69.69 0 0 1 13 4z" />
    </g>
  </g>
</svg>`;

case 'locations':
return `<svg viewBox="0 0 83 83" id="locations" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="dLayer_2" data-name="Layer 2">
    <g id="dLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM50.93 51.39c-3.43 6.15-6.81 11.29-7 11.5l-2 3.11a.52.52 0 0 1-.86 0l-2-3.11c-.14-.21-3.52-5.35-7-11.5-4.86-8.71-7.23-14.74-7.23-18.39a16.66 16.66 0 1 1 33.32 0c0 3.65-2.37 9.68-7.23 18.39z" />
      <path fill="currentColor" d="M41.25 26.68a5.35 5.35 0 0 0 .25 10.7 5.35 5.35 0 1 0-.25-10.7z" />
    </g>
  </g>
</svg>`;
case 'photos':
return `<svg viewBox="0 0 83 83" id="photos" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M19.11 55l12.63-17a.35.35 0 0 1 .26-.1.32.32 0 0 1 .29.13L43 51.18l8.36-7.36a.37.37 0 0 1 .49 0l12 12.48V25H19.11zm31.55-26a4.3 4.3 0 1 1-4.3 4.3 4.3 4.3 0 0 1 4.3-4.3z" />
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm-8.85 62.43a.89.89 0 0 1-.88.88H14.73a.89.89 0 0 1-.88-.88V20.57a.89.89 0 0 1 .88-.88h53.54a.89.89 0 0 1 .88.88z" />
    </g>
  </g>
</svg>`;
case 'profilepic':
return `<svg viewBox="0 0 83 83" id="profilepic" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="fLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM60.48 64.56h-.08l-10.29-5.22A3.94 3.94 0 0 1 48 55.82v-4.06c.28-.33.62-.76 1-1.26a24 24 0 0 0 3.2-6.45 3.25 3.25 0 0 0 2.29-3.11v-4.3a3.22 3.22 0 0 0-1.07-2.4V28s1.27-9.74-11.84-9.74S29.67 28 29.67 28v6.26a3.19 3.19 0 0 0-1.08 2.4v4.3a3.25 3.25 0 0 0 1.49 2.73A21.57 21.57 0 0 0 34 51.75v4a4 4 0 0 1-2 3.46l-9.56 5.25a29.87 29.87 0 1 1 38.11.13z"
      id="fLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'update_failed':
return `<svg viewBox="0 0 25 21.58" id="update_failed" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="eLayer_2" data-name="Layer 2">
    <g id="eLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M15 3.6v2.49a.3.3 0 0 0 .51.22l2.9-2.9a.29.29 0 0 0 0-.42l-2.9-2.9A.3.3 0 0 0 15 .3v2.3a9.68 9.68 0 0 0-3.93 1.09 4.68 4.68 0 0 1 .5.87A8.49 8.49 0 0 1 15 3.6zm10 7.98h-1v.5a8.5 8.5 0 0 1-16.86 1.5h-1A9.49 9.49 0 0 0 25 12.08v-.5z" />
      <path fill="currentColor" d="M6.5 1.58a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0-6.5-6.5zm0 12a5.5 5.5 0 1 1 5.5-5.5 5.51 5.51 0 0 1-5.5 5.5z" />
      <path fill="currentColor" d="M6.7 4.58h-.4a.29.29 0 0 0-.3.3v4.4a.3.3 0 0 0 .3.3h.4a.3.3 0 0 0 .3-.3v-4.4a.29.29 0 0 0-.3-.3zm0 6h-.4a.29.29 0 0 0-.3.3v.4a.3.3 0 0 0 .3.3h.4a.3.3 0 0 0 .3-.3v-.4a.29.29 0 0 0-.3-.3z" />
    </g>
  </g>
</svg>`;
case 'wechat':
return `<svg viewBox="0 0 83 83" id="wechat" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="hLayer_2" data-name="Layer 2">
    <g id="hLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M25.44 27.32A2.53 2.53 0 1 0 28 29.85a2.53 2.53 0 0 0-2.56-2.53zm22.82 17.45a2.13 2.13 0 1 0 2.13 2.13 2.13 2.13 0 0 0-2.13-2.13zm-6.79-12.4A2.53 2.53 0 1 0 39 29.85a2.52 2.52 0 0 0 2.47 2.52z" />
      <path fill="currentColor" d="M78 0H5a5 5 0 0 0-5 5v73a5 5 0 0 0 5 5h73a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM33.45 52.46a24.06 24.06 0 0 1-4.69-.46h-.06l-.77-.16a1.71 1.71 0 0 0-1.49.41l-5.87 3.46a.19.19 0 0 1-.29-.21c.27-1.14 1-4.16 1.2-5.14a1.45 1.45 0 0 0-.56-1.48l-.47-.32a18.05 18.05 0 0 1-8.25-14.81C12.18 23.37 21.71 15 33.45 15c11.41 0 20.72 7.9 21.25 17.83C44 33 35.33 40.68 35.33 50.16a14.75 14.75 0 0 0 .17 2.21c-.67.06-1.36.09-2.05.09zM66 62.68c-.13.09-.26.18-.4.26a1.26 1.26 0 0 0-.47 1.26c.18.82.78 3.37 1 4.34a.16.16 0 0 1-.24.18L61 65.8a1.48 1.48 0 0 0-1.26-.35l-.64.14A19.77 19.77 0 0 1 55 66c-9.92 0-18-7.08-18-15.82s8-15.82 18-15.82 18 7.08 18 15.82a15.24 15.24 0 0 1-7 12.5z" />
      <path fill="currentColor" d="M61.8 44.77a2.13 2.13 0 1 0 2.13 2.13 2.13 2.13 0 0 0-2.13-2.13z" />
    </g>
  </g>
</svg>`;
case 'add_attack_vector':
return `<svg viewBox="0 0 16 16" id="add_attack_vector" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm.5 15v-1.58h-1V15A7 7 0 0 1 1 8.5h2v-1H1A7 7 0 0 1 7.5 1v1.92h1V1A7 7 0 0 1 15 7.5h-2v1h2A7 7 0 0 1 8.5 15z" />
      <circle fill="currentColor" cx="8" cy="8" r="2.5" />
    </g>
  </g>
</svg>`;
case 'fetch_failed':
return `<svg viewBox="0 0 25 20" id="fetch_failed" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="dLayer_2" data-name="Layer 2">
    <g id="dLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M15.5 1a9.42 9.42 0 0 0-4.74 1.28 6.79 6.79 0 0 1 .65.77A8.5 8.5 0 1 1 15.5 19a8.52 8.52 0 0 1-8.27-6.55 5.84 5.84 0 0 1-.73.05h-.29A9.5 9.5 0 1 0 15.5 1z" />
      <path fill="currentColor" d="M17.66 12.82H16V6.3a.29.29 0 0 0-.3-.3h-.4a.29.29 0 0 0-.3.3v6.52h-1.66a.22.22 0 0 0-.15.37l2.16 2.16a.22.22 0 0 0 .3 0l2.16-2.16a.22.22 0 0 0-.15-.37z" />
      <path fill="currentColor" d="M6.5 0A6.5 6.5 0 1 0 13 6.5 6.51 6.51 0 0 0 6.5 0zm0 12A5.5 5.5 0 1 1 12 6.5 5.51 5.51 0 0 1 6.5 12z" />
      <path fill="currentColor" d="M6.7 3h-.4a.29.29 0 0 0-.3.3v4.4a.29.29 0 0 0 .3.3h.4a.29.29 0 0 0 .3-.3V3.3a.29.29 0 0 0-.3-.3zm0 6h-.4a.29.29 0 0 0-.3.3v.4a.29.29 0 0 0 .3.3h.4a.29.29 0 0 0 .3-.3v-.4a.29.29 0 0 0-.3-.3z" />
    </g>
  </g>
</svg>`;
case 'no_devices':
return `<svg viewBox="0 0 119 64" id="no_devices" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <g id="aLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M117.36 15H101V2.74A2.74 2.74 0 0 0 98.26 0H12.74A2.74 2.74 0 0 0 10 2.74V30H1a1 1 0 0 0-1 1v32a1 1 0 0 0 1 1h19a1 1 0 0 0 1-1v-4h33v3H43.3a.29.29 0 0 0-.3.3v1.4a.29.29 0 0 0 .3.3h23.4a.29.29 0 0 0 .3-.3v-1.4a.29.29 0 0 0-.3-.3H56v-3h24v3.36A1.63 1.63 0 0 0 81.64 64h35.72a1.63 1.63 0 0 0 1.64-1.64V16.64a1.63 1.63 0 0 0-1.64-1.64zM19 32v21H2V32zM2 62v-7h17v7zm78-45.36V57H21V31a1 1 0 0 0-1-1h-8V2.74a.74.74 0 0 1 .74-.74h85.52a.74.74 0 0 1 .74.74V15H81.64A1.63 1.63 0 0 0 80 16.64zM117 62H82v-7h35zm0-9H82V17h35z" />
      <circle fill="currentColor" cx="10.5" cy="58.5" r="1.5" />
      <circle fill="currentColor" cx="99.5" cy="58.5" r="1.5" />
    </g>
  </g>
</svg>`;
case 'no_signal':
return `<svg viewBox="0 0 15.85 15.34" id="no_signal" width="${size ? size : '9.6vw'}" height="${size ? size : '9.6vw'}">

  <g id="dLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M3.86 0l8.73 14.18-1.85 1.16L2 1.16zm8.59 8.68a9.63 9.63 0 0 0-2.55-.95l1.94 3.16L13 9l-.4-.22zM7.94 2.79H6.88l1.67 2.75a10.61 10.61 0 0 1 5.7 2.06l1.6-2.2a13.3 13.3 0 0 0-7.91-2.61zm-.46 9.33a2.93 2.93 0 0 0-1.48.52l1.92 2.25.72-.84zM2.47 4A13.37 13.37 0 0 0 0 5.43l1.61 2.19a11.68 11.68 0 0 1 2.3-1.3zM5 8a9.14 9.14 0 0 0-1.52.65L2.92 9l1.44 2.31.39-.22a6.82 6.82 0 0 1 1.68-.66z"
      id="dLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'scanning_for_devices':
return `<svg viewBox="0 0 76.5 69" id="scanning_for_devices" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="eLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M34.5 35.5h42v-2H69A34.49 34.49 0 1 0 34.5 69a34.07 34.07 0 0 0 6.18-.57l-.37-2A32.5 32.5 0 1 1 67 33.5h-6.54a25.85 25.85 0 0 0-.75-5.31A3.48 3.48 0 0 0 57.5 22h-.22a26 26 0 0 0-21-13.44 4.48 4.48 0 0 0-8.7.9 25.95 25.95 0 0 0-17 35.05 3.5 3.5 0 0 0 2.48 6 3.61 3.61 0 0 0 .93-.14 25.9 25.9 0 0 0 25.2 9.72l-.36-2a23.88 23.88 0 0 1-23.14-8.82A3.49 3.49 0 0 0 13 43.5a4.17 4.17 0 0 0-.71.07 23.95 23.95 0 0 1 15.48-32.08 4.48 4.48 0 0 0 8.67-.89 24 24 0 0 1 19 12.13A3.49 3.49 0 0 0 57.5 29h.34a23.32 23.32 0 0 1 .62 4.53h-6a17.93 17.93 0 0 0-30.27-12A3.43 3.43 0 0 0 20.5 21a3.49 3.49 0 0 0-2.38 6.05 17.83 17.83 0 0 0-1.62 7.45 18 18 0 0 0 18 18 17.58 17.58 0 0 0 3.18-.3l-.36-2a16.43 16.43 0 0 1-2.82.26 16 16 0 0 1-16-16 15.8 15.8 0 0 1 1.42-6.56 3.68 3.68 0 0 0 .58.06A3.5 3.5 0 0 0 24 24.5a3.46 3.46 0 0 0-.42-1.63A15.93 15.93 0 0 1 50.45 33.5h-5a11.07 11.07 0 1 0-9 11.82l-.37-2a8.65 8.65 0 0 1-1.54.14 9 9 0 1 1 8.94-10h-4.6A4.5 4.5 0 1 0 34.5 39a4.4 4.4 0 0 0 .73-.07l-.37-2a2.2 2.2 0 0 1-.36 0 2.5 2.5 0 1 1 2.29-3.5H34.5zM14.5 47a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5zM32 12.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5zm24 13a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1-1.5-1.5zm-35.5.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
      id="eLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'update_failed':
return `<svg viewBox="0 0 24.29 21.16" id="update_failed" width="${size ? size : ''}" height="${size ? size : ''}">

  <g id="fLayer_2" data-name="Layer 2">
    <g id="fLayer_1-2" data-name="Layer 1">
      <path fill="currentColor" d="M10.7 4.32a8.75 8.75 0 0 1 3.7-1.13v2.58l2.88-2.88L14.4 0v2.65a9.08 9.08 0 0 0-4 1.2c.13.15.22.31.3.47zm12.54 3.27l-.48.25a8.72 8.72 0 1 1-16.44 4.45 4.53 4.53 0 0 1-.52 0 9.27 9.27 0 1 0 17.44-4.7z" />
      <path fill="currentColor" d="M5.8 1a5.8 5.8 0 1 0 5.8 5.8A5.8 5.8 0 0 0 5.8 1zm0 11A5.2 5.2 0 1 1 11 6.82 5.21 5.21 0 0 1 5.8 12z" />
      <path fill="currentColor" d="M5.3 5.32h1v5h-1zm0-2h1v1h-1z" />
    </g>
  </g>
</svg>`;
case 'type-banner':
return `<svg viewBox="0 0 13 12" id="type-banner" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M12 0H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm-1 5H7.5v2.31h.94a.28.28 0 0 1 0 .38L6.69 9.44a.28.28 0 0 1-.38 0L4.56 7.69a.28.28 0 0 1 0-.38h.94V5H2V2.56A.56.56 0 0 1 2.56 2h7.88a.56.56 0 0 1 .56.56z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'type-interceptor':
return `<svg viewBox="0 0 14 12" id="type-interceptor" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M13 0H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zM4 7.7a.29.29 0 0 1-.3.3H2.3a.29.29 0 0 1-.3-.3V4.3a.29.29 0 0 1 .3-.3h1.4a.29.29 0 0 1 .3.3zm3 2a.29.29 0 0 1-.3.3H5.3a.29.29 0 0 1-.3-.3V2.3a.29.29 0 0 1 .3-.3h1.4a.29.29 0 0 1 .3.3zm3-2a.29.29 0 0 1-.3.3H8.3a.29.29 0 0 1-.3-.3V4.3a.29.29 0 0 1 .3-.3h1.4a.29.29 0 0 1 .3.3zM12.93 6l-1.76 1.8a.1.1 0 0 1-.17-.05V4.24a.1.1 0 0 1 .17-.07l1.76 1.71a.1.1 0 0 1 0 .12z"
      id="bLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'type-link':
return `<svg viewBox="0 0 13 14.29" id="type-link" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="cLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M12 0H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2v1.79a.5.5 0 0 0 .85.36L6 12h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zM7 7.79a.21.21 0 0 1-.21.21H2.21A.21.21 0 0 1 2 7.79V6.21A.21.21 0 0 1 2.21 6h4.58a.21.21 0 0 1 .21.21zm4.44-3.6L9.69 5.94a.28.28 0 0 1-.38 0V5h-7A.26.26 0 0 1 2 4.74V3.26A.26.26 0 0 1 2.26 3h7.05v-.94a.28.28 0 0 1 .38 0l1.75 1.75a.28.28 0 0 1 0 .38z"
      id="cLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'type-x-caliber':
return `<svg viewBox="0 0 13 12" id="type-x-caliber" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="dLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M12 0H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm-2 9.7a.29.29 0 0 1-.3.3H7.26A.26.26 0 0 1 7 9.74l.82-.82-1.25-1.38a.28.28 0 0 0-.44 0l-2 2.23a.3.3 0 0 1-.42 0l-.82-.74a.3.3 0 0 1 0-.42L5 6.22a.28.28 0 0 0 0-.4L2.85 3.4a.3.3 0 0 1 0-.42l.82-.74a.29.29 0 0 1 .42 0l2 2.23a.29.29 0 0 0 .44 0l2-2.24a.29.29 0 0 1 .42 0l.89.77a.3.3 0 0 1 0 .42l-2.16 2.4a.28.28 0 0 0 0 .4L9 7.72 9.74 7a.26.26 0 0 1 .26.26z"
      id="dLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'status-browseHttp':
return `<svg viewBox="0 0 13 17" id="status-http" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="aLayer_2" data-name="Layer 2">
    <path fill="#6cfff88c" d="M13 5.5A5.5 5.5 0 0 0 8.16 0h.05-1.42a5.51 5.51 0 0 0-4.18 3H.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V11h.21-.05A5.5 5.5 0 0 0 13 5.5zM11.72 7H10.3a6.9 6.9 0 0 0 0-3h1.42A4.39 4.39 0 0 1 12 5.5a4.39 4.39 0 0 1-.28 1.5zM8 1.22A6.82 6.82 0 0 1 9 3H8zM7 3H6a6.82 6.82 0 0 1 1-1.78zm0 1v3H5.7a6.9 6.9 0 0 1 0-3zm0 5.78A6.82 6.82 0 0 1 6 8h1zM4.7 7H3.28A4.39 4.39 0 0 1 3 5.5 4.39 4.39 0 0 1 3.28 4H4.7a6.9 6.9 0 0 0 0 3zM5 8a7 7 0 0 0 1 1.71A4.53 4.53 0 0 1 3.76 8zm3 0h1a6.82 6.82 0 0 1-1 1.78zm0-1V4h1.3a6.9 6.9 0 0 1 0 3zm3.24-4H10a7 7 0 0 0-.95-1.71A4.53 4.53 0 0 1 11.24 3zM6 1.29A7 7 0 0 0 5 3H3.76A4.53 4.53 0 0 1 6 1.29zM4 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm3-3H1V4h1.21A5.72 5.72 0 0 0 2 5.5 5.5 5.5 0 0 0 6.84 11H7zm2.05-3.29A7 7 0 0 0 10 8h1.24a4.53 4.53 0 0 1-2.19 1.71z"
      id="aLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'status-browseHttps':
return `<svg viewBox="0 0 17 17.18" id="status-https" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="bLayer_2" data-name="Layer 2">
    <path fill="currentColor" d="M15.92 14v-1.66a1.61 1.61 0 1 0-3.22 0V14h-1.08v3.23H17V14zm-2.39-1.61a.78.78 0 0 1 1.56 0V14h-1.56zM13 5.5A5.5 5.5 0 0 0 8.16 0h.05-1.42a5.51 5.51 0 0 0-4.18 3H.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V11h.21-.05A5.5 5.5 0 0 0 13 5.5zM11.72 7H10.3a6.9 6.9 0 0 0 0-3h1.42A4.39 4.39 0 0 1 12 5.5a4.39 4.39 0 0 1-.28 1.5zM8 1.22A6.82 6.82 0 0 1 9 3H8zM7 3H6a6.82 6.82 0 0 1 1-1.78zm0 1v3H5.7a6.9 6.9 0 0 1 0-3zm0 5.78A6.82 6.82 0 0 1 6 8h1zM4.7 7H3.28A4.39 4.39 0 0 1 3 5.5 4.39 4.39 0 0 1 3.28 4H4.7a6.9 6.9 0 0 0 0 3zM5 8a7 7 0 0 0 1 1.71A4.53 4.53 0 0 1 3.76 8zm3 0h1a6.82 6.82 0 0 1-1 1.78zm0-1V4h1.3a6.9 6.9 0 0 1 0 3zm3.24-4H10a7 7 0 0 0-.95-1.71A4.53 4.53 0 0 1 11.24 3zM6 1.29A7 7 0 0 0 5 3H3.76A4.53 4.53 0 0 1 6 1.29zM4 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm3-3H1V4h1.21A5.72 5.72 0 0 0 2 5.5 5.5 5.5 0 0 0 6.84 11H7zm2.05-3.29A7 7 0 0 0 10 8h1.24a4.53 4.53 0 0 1-2.19 1.71z"
      id="bLayer_1-2" data-name="Layer 1" />
  </g>
</svg>`;
case 'target_device_attacking':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 36" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path fill="#a7cff7" d="M9,8H1A1,1,0,0,0,0,9V35a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V17l-1-.75V29H1V9H8.5ZM8.5,34A1.5,1.5,0,1,1,10,32.5,1.5,1.5,0,0,1,8.5,34Z" />
      <path fill="#6cfff8" d="M16.5,0A8.5,8.5,0,1,0,25,8.5,8.51,8.51,0,0,0,16.5,0ZM17,15.91V13H16v2.91A7.42,7.42,0,0,1,9.09,9H12V8H9.09a8.27,8.27,0,0,1,.12-1,7.51,7.51,0,0,1,1.55-3.23,6.89,6.89,0,0,1,1-1A7.43,7.43,0,0,1,16,1.08V4h1V1.08a7.43,7.43,0,0,1,4.23,1.68,6.89,6.89,0,0,1,1,1A7.51,7.51,0,0,1,23.79,7a8.27,8.27,0,0,1,.12,1H21V9h2.91A7.42,7.42,0,0,1,17,15.91Z" />
      <circle fill="#6cfff8" cx="16.5" cy="8.5" r="1.5" />
    </g>
  </g>
</svg>`;
case 'bell_notification':
return `<svg xmlns="http://www.w3.org/2000/svg" width="17.67" height="19.828" viewBox="0 0 17.67 19.828">
  <g id="Group_136" data-name="Group 136" transform="translate(-1825 -529)">
    <path id="Path_77" fill="#ff4d6a" d="M353.482 1298.891l-.683-1.168a1.6 1.6 0 0 1-.216-.8v-4.366c0-2.913-3.173-5.47-6.216-5.47s-6.216 2.329-6.216 5.47v4.366a1.591 1.591 0 0 1-.217.8l-.682 1.168a1.564 1.564 0 0 0 1.3 2.367h2.248a3.562 3.562 0 0 0 7.125 0h2.249a1.564 1.564 0 0 0 1.308-2.367zm-7.116 4.148a1.783 1.783 0 0 1-1.781-1.781h3.562a1.783 1.783 0 0 1-1.781 1.782zm-5.4-3.562l.5-.856a3.381 3.381 0 0 0 .46-1.7v-4.366c0-2.137 2.381-3.689 4.435-3.689 1.954 0 4.435 1.655 4.435 3.689v4.366a3.374 3.374 0 0 0 .46 1.7l.5.857z"
      data-name="Path 77" transform="translate(1488.969 -755.994)" />
    <g id="Ellipse_52" fill="#ff4d6a" stroke="#3d5064" data-name="Ellipse 52" transform="translate(1825 529)">
      <circle cx="5" cy="5" r="5" stroke="none" fill="none" />
      <circle cx="5" cy="5" r="4.5" fill="#ff4d6a" stroke="#ff4d6a" />
    </g>
  </g>
</svg>
`
case 'bell_empty':
return `<svg xmlns="http://www.w3.org/2000/svg" width="14.67" height="17.738" viewBox="0 0 14.67 17.738">
  <path id="Path_77" d="M353.482 1298.891l-.683-1.168a1.6 1.6 0 0 1-.216-.8v-4.366c0-2.913-3.173-5.47-6.216-5.47s-6.216 2.329-6.216 5.47v4.366a1.591 1.591 0 0 1-.217.8l-.682 1.168a1.564 1.564 0 0 0 1.3 2.367h2.248a3.562 3.562 0 0 0 7.125 0h2.249a1.564 1.564 0 0 0 1.308-2.367zm-7.116 4.148a1.783 1.783 0 0 1-1.781-1.781h3.562a1.783 1.783 0 0 1-1.781 1.782zm-5.4-3.562l.5-.856a3.381 3.381 0 0 0 .46-1.7v-4.366c0-2.137 2.381-3.689 4.435-3.689 1.954 0 4.435 1.655 4.435 3.689v4.366a3.374 3.374 0 0 0 .46 1.7l.5.857z"
    fill="#c5e1ff" data-name="Path 77" transform="translate(-339.031 -1287.083)" />
</svg>`
case 'target_device_failed':
case 'target_device_aborted':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 36" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path fill="#6a8699" d="M9,8H1A1,1,0,0,0,0,9V35a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V17l-1-.75V29H1V9H8.5ZM8.5,34A1.5,1.5,0,1,1,10,32.5,1.5,1.5,0,0,1,8.5,34Z" />
      <path fill="#ff4d6a" d="M16.5,0A8.5,8.5,0,1,0,25,8.5,8.51,8.51,0,0,0,16.5,0Zm0,15.94A7.45,7.45,0,0,1,9.21,7a7.51,7.51,0,0,1,1.55-3.23,6.89,6.89,0,0,1,1-1,7.43,7.43,0,0,1,9.46,0,6.89,6.89,0,0,1,1,1A7.51,7.51,0,0,1,23.79,7a7.45,7.45,0,0,1-7.29,8.94Z" />
      <rect fill="#ff4d6a" x="13" y="7" width="7" height="1" transform="translate(24 -9) rotate(90)" />
      <rect fill="#ff4d6a" x="16" y="12" width="1" height="1" transform="translate(29 -4) rotate(90)" />
    </g>
  </g>
</svg>`;
case 'target_device_offline':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 28" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path fill="#6a8699" d="M16,0H1A1,1,0,0,0,0,1V27a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V1A1,1,0,0,0,16,0ZM8.5,26A1.5,1.5,0,1,1,10,24.5,1.5,1.5,0,0,1,8.5,26ZM16,21H1V1H16Z" />
    </g>
  </g>
</svg>`;
case 'target_device_active':
case 'target_device_ready':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 28" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path fill="#c5e1ff" d="M16,0H1A1,1,0,0,0,0,1V27a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V1A1,1,0,0,0,16,0ZM8.5,26A1.5,1.5,0,1,1,10,24.5,1.5,1.5,0,0,1,8.5,26ZM16,21H1V1H16Z" />
    </g>
  </g>
</svg>`;
case 'target_device_unknown':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 36" width="${size ? size : ''}" height="${size ? size : ''}">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path fill="#6a8699" d="M25,8.5A8.49,8.49,0,0,0,8,8H1A1,1,0,0,0,0,9V35a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V17l0,0A8.5,8.5,0,0,0,25,8.5ZM8.5,34A1.5,1.5,0,1,1,10,32.5,1.5,1.5,0,0,1,8.5,34ZM1,29V9H8a8.48,8.48,0,0,0,8,8V29ZM16.5,15.94A7.45,7.45,0,0,1,9.21,7a7.51,7.51,0,0,1,1.55-3.23,6.89,6.89,0,0,1,1-1,7.43,7.43,0,0,1,9.46,0,6.89,6.89,0,0,1,1,1A7.51,7.51,0,0,1,23.79,7a7.45,7.45,0,0,1-7.29,8.94Z" />
      <rect fill="#6a8699" x="15.94" y="11.52" width="0.98" height="1.34" />
      <path fill="#6a8699" d="M16.58,4.45a7.37,7.37,0,0,0-2,.36l.06.73L15,5.48a8.42,8.42,0,0,1,1.55-.21,2.12,2.12,0,0,1,1.21.27,1,1,0,0,1,.39.84,1.55,1.55,0,0,1-.21.87,4.87,4.87,0,0,1-.81.84,6.14,6.14,0,0,0-.89.88,1.19,1.19,0,0,0-.28.76,1.57,1.57,0,0,0,.16.73h.75V10a1.14,1.14,0,0,1,.24-.7A6.27,6.27,0,0,1,18,8.49a3.58,3.58,0,0,0,.85-.94A2.59,2.59,0,0,0,19,6.37a1.72,1.72,0,0,0-.6-1.47A3,3,0,0,0,16.58,4.45Z" />
    </g>
  </g>
</svg>`;
case 'eye-password':
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 11" width="${size ? size : ''}" height="${size ? size : ''}">
  <defs>
    <style>
      .eye-password {
        fill: currentColor;
        fill-rule: evenodd
      }

    </style>
  </defs>
  <path id="aeye" class="eye-password" d="M1236 986.99c-3.09 0-5.95-1.919-7.87-5.264l-.13-.233.13-.232c1.92-3.346 4.78-5.264 7.87-5.264s5.95 1.918 7.86 5.264l.14.232-.14.233c-1.91 3.345-4.78 5.264-7.86 5.264zm-7.11-5.5c1.77 2.957 4.35 4.648 7.11 4.648s5.34-1.691 7.1-4.648c-1.76-2.957-4.34-4.647-7.1-4.647s-5.34 1.693-7.11 4.65zm7.09 2.948a3 3 0 1 1 2.6-2.973 2.8 2.8 0 0 1-2.6 2.976zm0-5.1a2.144 2.144 0 1 0 1.85 2.123 2 2 0 0 0-1.85-2.116z"
    transform="translate(-1228 -976)" />
</svg>`;
case 'alice-green':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : ''}" height="${size ? size : ''}" viewBox="0 0 31.61 21.09">
  <defs>
    <style>
      .cls-1 {
        fill: #c4e0ff;
      }

      .cls-2 {
        fill: #6cfff8;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path class="cls-1" d="M13.19,10.09H0v5H16.09A17.6,17.6,0,0,1,13.19,10.09ZM2,13.09v-1H5v1Z" />
      <path class="cls-1" d="M21.93,19.85a20.39,20.39,0,0,1-5-3.76H0v3.37a1.63,1.63,0,0,0,1.62,1.63H21.38a1.6,1.6,0,0,0,1.38-.79ZM5,19.09H2v-1H5Z" />
      <path class="cls-1" d="M12.16,4.59v-.5H1.62A1.62,1.62,0,0,0,0,5.71V9.09H12.86A16.14,16.14,0,0,1,12.16,4.59ZM5,7.09H2v-1H5Z" />
      <path class="cls-2" d="M23.16,0,14,4.57c.09,6.43,4.21,11.17,8.81,13.66,4.59-2.49,8.71-7.23,8.8-13.66Zm3,5.19L27.62,6.6l-5.16,5.16L19,8.33l1.42-1.42,2,2" />
    </g>
  </g>
</svg>`
case 'alice-red':
return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : ''}" height="${size ? size : ''}" viewBox="0 0 33.61 19">
  <g id="Group_133" data-name="Group 133" transform="translate(-1042.92 -489)">
    <path id="_-e-Shape_557" d="M3879.99 1824.98l-9.34 4.52c.09 6.36 4.3 11.04 8.98 13.51 4.68-2.47 8.89-7.15 8.98-13.51zm3.1 5.13l1.44 1.4-5.25 5.1-3.5-3.39 1.44-1.4 2.06 1.99"
      fill="#ff4d6a" fill-rule="evenodd" data-name="-e-Shape 557" transform="translate(-2813 -1335.98)" />
    <path id="_-e-Shape_556" d="M3869.25 1835h-13.33v5h16.25a17.308 17.308 0 0 1-2.92-5zm-11.31 3v-1h3.03v1zm20.13 6.76a20.237 20.237 0 0 1-5.01-3.76h-17.14v3.38a1.637 1.637 0 0 0 1.64 1.62h19.95a1.651 1.651 0 0 0 1.4-.79zm-17.1-.76h-3.03v-1h3.03zm7.23-14.49v-.51h-10.64a1.637 1.637 0 0 0-1.64 1.62v3.38h12.98a16.848 16.848 0 0 1-.7-4.49zm-7.23 2.49h-3.03v-1h3.03z"
      fill="#c5e1ff" data-name="-e-Shape 556" transform="translate(-2813 -1335.98)" />
  </g>
</svg>
`
case 'pioneer':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : ''}" height="${size ? size : ''}" refresh
  viewBox="0 0 23 17">
  <defs>
    <style>
      .cls-1 {
        fill: #c4e0ff;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path class="cls-1" d="M13,4a9.92,9.92,0,0,1,.84-4H1.62A1.63,1.63,0,0,0,0,1.62V5H13.05C13,4.67,13,4.34,13,4ZM5,3H2V2H5Z" />
      <path class="cls-1" d="M13.2,6H0v5H15.87A9.92,9.92,0,0,1,13.2,6ZM2,9V8H5V9Z" />
      <path class="cls-1" d="M0,12v3.38A1.63,1.63,0,0,0,1.62,17H21.38A1.63,1.63,0,0,0,23,15.38V14a9.9,9.9,0,0,1-6-2Zm5,3H2V14H5Z" />
    </g>
  </g>
</svg>`

case 'cloud-green':
return `<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : ''}" height="${size ? size : ''}" viewBox="0 0 34 18.44">
  <defs>
    <style>
      .cls-1 {
        fill: #c4e0ff;
      }

      .cls-2 {
        fill: #6cfff8;
      }

    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path class="cls-1" d="M19.66,14.53H15.85a5.33,5.33,0,0,1-3.23-1.09H0v3.38a1.62,1.62,0,0,0,1.62,1.62H21.38A1.62,1.62,0,0,0,23,16.82V14.53ZM5,16.44H2v-1H5Z" />
      <path class="cls-1" d="M14.53,4.11a5.47,5.47,0,0,1,.62-1.48,5.69,5.69,0,0,1,.93-1.19H1.62A1.63,1.63,0,0,0,0,3.07V6.44H11.31A5.38,5.38,0,0,1,14.53,4.11ZM2,4.44v-1H5v1Z" />
      <path class="cls-1" d="M10.48,9.24a5.13,5.13,0,0,1,.32-1.8H0v5H11.6A5.2,5.2,0,0,1,10.48,9.24ZM5,10.44H2v-1H5Z" />
      <path class="cls-2" d="M34,8.59a4,4,0,0,0-3.76-3.94V4.56A4.61,4.61,0,0,0,25.58,0a4.69,4.69,0,0,0-3.86,2,4,4,0,0,0-4.85,1.66A3.72,3.72,0,0,0,16.36,6h-.51a3.29,3.29,0,1,0,0,6.58H30.18a3.37,3.37,0,0,0,2-.64A3.9,3.9,0,0,0,34,8.59Z" />
    </g>
  </g>
</svg>`
case 'cloud-red':
return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size ? size : ''}" height="${size ? size : ''}" viewBox="0 0 33.61 19">
  <g id="Group_134" data-name="Group 134" transform="translate(-638 -491)">
    <path id="_-e-Shape_559" d="M3523.61 1835.87a4.087 4.087 0 0 0-3.83-4.06v-.1a4.735 4.735 0 0 0-4.76-4.71 4.8 4.8 0 0 0-3.94 2.05 4.1 4.1 0 0 0-1.46-.27 4.032 4.032 0 0 0-3.49 1.99 3.943 3.943 0 0 0-.51 2.37h-.53a3.4 3.4 0 0 0 0 6.8h14.62a3.467 3.467 0 0 0 2.03-.66 4.084 4.084 0 0 0 1.87-3.41z"
      fill="#ff4d6a" fill-rule="evenodd" data-name="-e-Shape 559" transform="translate(-2852 -1336)" />
    <path id="_-e-Shape_558" d="M3508.66 1841.01h-3.81c-1.22 0-2.12.01-3.23-.01H3489v3.38a1.626 1.626 0 0 0 1.62 1.62h19.76a1.626 1.626 0 0 0 1.62-1.62v-3.37h-3.34zM3494 1844h-3v-1h3zm9.53-12.33a5.47 5.47 0 0 1 .62-1.48 5.678 5.678 0 0 1 .93-1.19h-14.46a1.626 1.626 0 0 0-1.62 1.62v3.38h11.31a5.3 5.3 0 0 1 3.22-2.33zm-12.53.33v-1h3v1zm8.48 4.8a5.125 5.125 0 0 1 .32-1.8H3489v5h11.6a5.2 5.2 0 0 1-1.12-3.2zm-5.48 1.2h-3v-1h3z"
      fill="#c5e1ff" fill-rule="oddeven" data-name="-e-Shape 558" transform="translate(-2851 -1336)" />
  </g>
</svg>
`
default:
return '';
case 'export-ready':
return `<svg xmlns="http://www.w3.org/2000/svg" width="29.238" height="23.492" viewBox="0 0 29.238 23.492">
<path id="Path_340" d="M-42.677 1732.19l-1.535-1.535a.755.755 0 0 0-.535-.222.756.756 0 0 0-.535.222l-18.373 18.373-5.211-5.211a.757.757 0 0 0-1.07 0l-1.535 1.535a.757.757 0 0 0-.222.535.76.76 0 0 0 .222.535l7.281 7.281a.758.758 0 0 0 .535.222.759.759 0 0 0 .535-.222l20.443-20.444a.756.756 0 0 0 0-1.069z" fill="#6cfff8" data-name="Path 340" transform="translate(71.693 -1730.433)"/>
</svg>
`
}
}
}
