'use client';
import {useEffect} from 'react';
export function StudioLoader(){useEffect(()=>{if(document.querySelector('script[data-aido-app]'))return;const script=document.createElement('script');script.src='/app.js';script.dataset.aidoApp='true';document.body.appendChild(script);},[]);return null}
