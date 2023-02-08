describe("Check Rain Forecast in Sydney", function () {
  it("Check for Rain on Future Date", function () {
    const dateToday = new Date();
    const datePlus3 = new Date(dateToday);
    const futureDays = 3;
    datePlus3.setDate(datePlus3.getDate() + futureDays);
    const dateTodayFormatted = dateToday.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
    });
    const dateFutureFormatted = datePlus3.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
    });

    const threshold = parseFloat("50%") / 100.0;
    cy.visit("http://www.bom.gov.au/");
    cy.get('[data-original-title="Sydney forecast"]').should("exist").click();
    cy.url().should("include", "sydney.shtml");
    cy.get(".pop")
      .eq(futureDays)
      .then(($span) => {
        const rainFormatted = parseFloat($span.text()) / 100.0;
        if (rainFormatted >= threshold) {
          throw new Error(
            `Looks like it will be a rainy day on ${dateFutureFormatted}`
          );
        }
      });
  });
});
