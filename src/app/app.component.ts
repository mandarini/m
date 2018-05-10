import { Component, OnInit } from '@angular/core';
import {InterfaceService } from './interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private interfaceService: InterfaceService){
    window.addEventListener('devicemotion', function(event) {
      const x = event.accelerationIncludingGravity.x;
      const y = event.accelerationIncludingGravity.y;
      const z = event.accelerationIncludingGravity.z;
      const rot = event.rotationRate;
      interfaceService.sendMsg({
        type: 'motion',
        x: x,
        y: y,
        z: z,
        rot: rot
      });
    }, true);

    window.addEventListener('deviceorientation', function(event) {
      const alpha = event.alpha;
      const beta = event.beta;
      const gamma = event.gamma;
      interfaceService.sendMsg({
        type: 'orientation',
        alpha: alpha,
        beta: beta,
        gamma: gamma,
      });
    }, true);

    window.addEventListener('devicelight', function(event) {
      console.log(event.value);
      interfaceService.sendMsg({
        type: 'light',
        light: event.value
      });
    }, true);

    window.addEventListener('deviceproximity', function(event) {
      // console.log("value: " + event.value, "max: " + event.max, "min: " + event.min);
      interfaceService.sendMsg({
        type: 'proximity',
        proximity: event,
      });
    });
  }

  ngOnInit() {
  }

}
