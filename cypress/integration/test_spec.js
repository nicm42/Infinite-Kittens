it('Loads cat images', () => {
	  cy.visit('http://localhost:1234');
    cy.get('img').should('have.length', 10);
  })
  
it('Tests intersection observer', () => {
  cy.visit('http://localhost:1234', {
    onBeforeLoad: (win) => {
      win.IntersectionObserver = function (cb, options) {
        const instance = {
          thresholds: Array.isArray(options.threshold)
            ? options.threshold
            : [options.threshold],
          root: options.root,
          rootMargin: options.rootMargin,
          time: Date.now(),
          observe: (element) => {
            const entry = [
              {
                isIntersecting: true,
                boundingClientRect: element.getBoundingClientRect(),
                intersectionRatio: 1,
                intersectionRect: element.getBoundingClientRect(),
                rootBounds: instance.root
                  ? instance.root.getBoundingClientRect()
                  : {},
                target: element,
                time: Date.now(),
              },
            ];
            cb(entry);
          },
          unobserve: () => undefined,
          disconnect: () => undefined,
        };
        return instance;
      };
    },
  })
})