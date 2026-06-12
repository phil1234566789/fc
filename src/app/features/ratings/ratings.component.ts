import { Component } from '@angular/core';

export interface RatingRange {
  range: string;
  description: string;
  tier: 'elite' | 'good' | 'average' | 'weak';
}

export interface AttributeInfo {
  key: string;
  fullName: string;
  blurb: string;
  ranges: RatingRange[];
}

@Component({
  selector: 'app-ratings',
  standalone: true,
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss',
})
export class RatingsComponent {
  readonly attributes: AttributeInfo[] = [
    {
      key: 'PAC',
      fullName: 'Pace',
      blurb: 'How fast a player moves with and without the ball.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description:
            'One of the quickest on the pitch. Creates danger with pace alone and wins sprints comfortably.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'Decent pace — can keep up with most players and occasionally burst past a defender when the run is well-timed.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Below average speed. Gets caught in open spaces and struggles in direct sprinting duels.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description:
            'Noticeably slow. Easily beaten for pace — must compensate with smart positioning and anticipation.',
        },
      ],
    },
    {
      key: 'SHO',
      fullName: 'Shooting',
      blurb: 'Finishing quality, shot accuracy, and ability to threaten from distance.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description:
            'Clinical in front of goal. High conversion rate, dangerous from range and close distance alike.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'Reliable finisher when well-placed. Occasional miss from close range, but generally gets shots on target.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Inconsistent — misses fairly straightforward chances and rarely threatens from distance.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description:
            'Rarely converts. Struggles to get shots on target. Best advised to pass rather than shoot.',
        },
      ],
    },
    {
      key: 'PAS',
      fullName: 'Passing',
      blurb: 'Short and long passing accuracy, vision, and ability to play incisive balls.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description:
            'Rarely misplaces a pass. Good vision — can play through balls and switch play with ease.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'Reliable over short distances. Occasional misplaced ball under pressure; inconsistent over longer range.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Comfortable only over short distances. Struggles with passes under pressure or into tight spaces.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description:
            'Frequently loses the ball through misplaced passes. Tends to play it overly safe and keep it simple.',
        },
      ],
    },
    {
      key: 'DRI',
      fullName: 'Dribbling',
      blurb: '1v1 ability, ball retention while moving, and shielding under pressure.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description: 'Wins most 1v1 duels. Rarely loses the ball when dribbling.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'Competent with the ball at feet. Can shield and occasionally drive past a defender when the moment is right.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Can win a dribble occasionally when the momentum is right; rarely gets past a good defender.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description:
            'Dribbles too often and unnecessarily. Frequently loses possession.',
        },
      ],
    },
    {
      key: 'DEF',
      fullName: 'Defending',
      blurb: 'Defensive positioning, tackling, interceptions, and defensive awareness.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description:
            'Dominant in defensive duels. Excellent positioning, reads play well, rarely gets beaten 1v1.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'Solid defensively. Wins most challenges and tracks runners, occasionally caught out of position.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Can be bypassed in 1v1s. Inconsistent positioning and struggles to recover when caught out.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description:
            'Rarely engages defensively. Minimal contribution without the ball — always a potential overload risk.',
        },
      ],
    },
    {
      key: 'PHY',
      fullName: 'Physicality',
      blurb: 'Strength, stamina, aerial ability, and performance over the course of the game.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description:
            'Dominant in physical battles. Holds up play, rarely gets muscled off the ball. High stamina throughout.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'Decent physically — can compete in challenges but not imposing. Stamina holds up for most of the game.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Can be pushed off the ball by stronger players. Noticeably tires in the second half.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description:
            'Easily muscled off the ball. Limited stamina — performance drops off sharply as the game goes on.',
        },
      ],
    },
    {
      key: 'TEC',
      fullName: 'Technique',
      blurb: 'Ball control, first touch quality, and how cleanly a player receives a pass.',
      ranges: [
        {
          range: '80 – 100',
          tier: 'elite',
          description: 'Can control even difficult balls cleanly. Consistently good first touch.',
        },
        {
          range: '60 – 79',
          tier: 'good',
          description:
            'First touch often decent. Needs at most two contacts to bring the ball under control.',
        },
        {
          range: '40 – 59',
          tier: 'average',
          description:
            'Needs multiple touches to receive and control a pass. Slows the game down.',
        },
        {
          range: 'Below 40',
          tier: 'weak',
          description: 'Struggles to control the ball. Makes frequent trapping errors.',
        },
      ],
    },
  ];
}
