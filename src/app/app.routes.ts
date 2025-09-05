import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { MatchComponent } from './components/match/match.component';

export const routes: Routes = [
{ path: '', component: LandingComponent },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'preferences', component: PreferenceComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'match', component: MatchComponent },
{ path: '**', redirectTo: '' }
];
