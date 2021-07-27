import { trigger, transition, style, query, state, animate } from '@angular/animations';

export const growAnimation = trigger('Grow', [
    state('inactive', style({
        transform: 'scale(0)'
    })),
    state('active', style({
        transform: 'scale(1)'
    })),
    transition('inactive => active', animate('500ms ease-in')),
]);

export const fadeAnimation = trigger('Fade', [
    state('in', style({opacity: 1})),
    state('out', style({opacity: 0})),
    transition(':enter', [
      style({opacity: 0}),
      animate(300 )
    ]),
    transition(':leave',
      animate(300, style({opacity: 0}))
    ),
    transition('out => in', animate('300ms')),
    transition('in => out', animate('300ms')),
]);
