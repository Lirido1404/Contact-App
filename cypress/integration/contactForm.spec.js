describe("ContactForm tests", () => {
  beforeEach(() => {
    cy.visit("/contact-form");

    // Remplacer par la méthode d'authentification appropriée si nécessaire
    // Par exemple, si vous avez une authentification pour accéder au formulaire
    cy.login(); // C'est une commande personnalisée que vous devrez définir dans Cypress
  });

  it("remplit et soumet le formulaire de contact", () => {
    // Remplir le formulaire
    cy.get('input[name="prenom"]').type("Jean");
    cy.get('input[name="nom"]').type("Dupont");
    cy.get('input[name="tel"]').type("0123456789");
    cy.get('input[name="email"]').type("jean.dupont@example.com");
    cy.get('input[name="adresse"]').type("123 Rue de la République");

    // Supposons que l'envoi du formulaire vous redirige vers la page d'accueil '/'
    cy.get("form").submit();
    cy.url().should("include", "/");

    // Vérifier si le toast de succès apparaît
    cy.contains("La photo a bien été importée.").should("be.visible");
  });

  it("ajoute une image et la prévisualise", () => {
    // Sélectionner un fichier image à télécharger
    // Assurez-vous d'avoir une image de test dans le répertoire "fixtures"
    cy.get('input[type="file"]').attachFile("path/to/image/testImage.jpg");
    cy.get(".preview").should("be.visible");
  });

  it("bascule le statut favori", () => {
    // Cliquer sur l'étoile pour ajouter aux favoris
    cy.get('input[name="favorite"]').check();
    cy.get('input[name="favorite"]').should("be.checked");

    // Cliquer de nouveau pour enlever des favoris
    cy.get('input[name="favorite"]').uncheck();
    cy.get('input[name="favorite"]').should("not.be.checked");
  });
});
