import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawableDirective } from './drawable.directive';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(DrawableDirective) canvas;

  predictions: any[];
  prediction: any;
  confidence: any;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.predictions = [];
    this.prediction = null;
    this.confidence = null;
  }

  async predict(imageData: ImageData) {
    // Preprocess the image
    for (let i = 0; i < imageData.data.length; i += 4) {
      /*  const R = imageData.data[i];
      const G = imageData.data[i + 1];
      const B = imageData.data[i + 2]; */
      const A = imageData.data[i + 3];

      /*  const luminosity = (R + G + B) / (3.0 * 255.0); */
      // const luminosity = (0.2627 * R + 0.678 * G + 0.0593 * B) / 255;
      // const luminosity = (0.2627 * R + 0.678 * G + 0.0593 * B) / (0.2627 * 255 + 0.678 * 255 + 0.0593 * 255);
      const opacity = A / 255.0;
      const value = opacity;

      imageData.data[i] = value;
      imageData.data[i + 1] = value;
      imageData.data[i + 2] = value;
      imageData.data[i + 3] = value;
    }

    const url = 'http://localhost:3000/predict';

    this.http.post(url, imageData).subscribe((response) => {
      this.predictions = Object.values(response);
      // Output
      this.prediction = this.predictions.indexOf(Math.max(...this.predictions));
      this.confidence = Math.round(Math.max(...this.predictions) * 10000) / 100;
    });
  }

  dataClear() {
    this.predictions = [];
    this.prediction = null;
    this.confidence = null;
  }
}
