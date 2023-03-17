import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ExpenseService } from './services/expense.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';




const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [ExpenseService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
