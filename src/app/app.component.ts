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
      let x = event.accelerationIncludingGravity.x;
      let y = event.accelerationIncludingGravity.y;
      let z = event.accelerationIncludingGravity.z;
      let rot = event.rotationRate;
      interfaceService.sendMsg({
        type: 'motion',
        x: x,
        y: y,
        z: z,
        rot: rot
      });
    }, true);

    window.addEventListener('deviceorientation', function(event) {
      let alpha = event.alpha;
      let beta = event.beta;
      let gamma = event.gamma;
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

  sendMessage(msg) {
    this.interfaceService.sendMsg("Test Message" + msg);
  }

}
