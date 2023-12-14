import { Categorie } from "./categorie";
export class Produit {
    id!: number;
    code!: string;
    designation!: string;
    prix!: number;
    categorie_id!: number; // Assurez-vous que cette propriété existe
    categorie!: Categorie;
}
