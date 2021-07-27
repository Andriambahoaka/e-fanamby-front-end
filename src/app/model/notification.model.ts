import { Utilisateur } from "./utilisateur.model";

export class Notification {
  _id?:Number;
   idNotification:number;
   contenu:string;
   token:string;
   created_at:Date;
   utilisateur:Utilisateur;
}
