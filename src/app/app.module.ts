import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ZoomFormComponent } from './zoom-form/zoom-form.component';
import { ComputerEmissionsFormComponent } from './computer-emissions-form/computer-emissions-form.component';
import { ResultComponent } from './result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { QueriesFormComponent } from './queries-form/queries-form.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'zoom', component: ZoomFormComponent },
  { path: 'computer_emissions', component: ComputerEmissionsFormComponent },
  { path: 'result', component: ResultComponent },
  { path: 'queries', component: QueriesFormComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ZoomFormComponent,
    ComputerEmissionsFormComponent,
    ResultComponent,
    QueriesFormComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
