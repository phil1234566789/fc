# Requirements

## Domain

Weekly 90-minute football session with 12 fixed players split into two teams of 6 (1 goalkeeper, 4 field players, 1 substitute per team).

---

## Data Model

### Player

| Field    | Type    | Notes                              |
|----------|---------|------------------------------------|
| name     | string  | required                           |
| image    | string  | URL or stored file                 |
| bday     | date    | Date of birth — never displayed raw; always shown as computed age only (privacy) |
| fitness  | enum (1–5) | 1 = Top Form / 2 = In Form / 3 = Formtief / 4 = Aus der Übung / 5 = Im Comeback — draft, subject to change |
| pac      | number  | FIFA attribute: Pace               |
| sho      | number  | FIFA attribute: Shooting           |
| pas      | number  | FIFA attribute: Passing            |
| dri      | number  | FIFA attribute: Dribbling          |
| def      | number  | FIFA attribute: Defending          |
| phy      | number  | FIFA attribute: Physicality        |
| tec      | number  | Custom attribute: Technique (ball control, first touch) |
| overall  | number  | Computed: avg(pac, sho, pas, dri, def, phy, tec) |

No FIFA fields used: position, nationality, club.

### Audit Log Entry

| Field       | Type      | Notes                          |
|-------------|-----------|--------------------------------|
| editor_name | string    | Who made the change            |
| action      | enum      | `update` or `delete`           |
| player_id   | reference | Which player was affected      |
| before      | object    | Full player snapshot before    |
| after       | object    | Full player snapshot after (null on delete) |
| reason      | string    | Required justification text    |
| timestamp   | datetime  |                                |

---

## UI Components

### Player Card (FIFA-style)

Reusable component used wherever a player is displayed (pitch view, player list, create/edit form preview).

Visually inspired by FIFA Ultimate Team cards:
- **Overall rating** — large, top area
- **Player photo** — center of card
- **Player name** — below photo
- **Stats grid** — bottom of card: PAC, SHO, PAS, DRI, DEF, PHY, TEC — exact layout TBD (7 stats, to be designed collaboratively)
- **One unified card design** — no color tiers or rarity levels, everyone gets the same card style (equal footing)

Not shown on card (by design): position, nationality, club.

Card layout and visual design to be worked out during implementation.

---

## Pages & Features

### 1. Player Management
- List all players
- Create player (all fields above)
- Edit player — every save writes an audit log entry (requires reason input)
- Delete player — requires reason input, writes audit log entry

**Player overview list shows per player:**
- Name, photo (small), overall rating, fitness
- **Games played** — derived: count of saved sessions the player participated in
- Last 5 results (W/D/L) — see section 6

### 2. Audit Log
- Read-only list of all audit log entries
- Shows: editor name, action, player name, before/after values, reason, timestamp
- Ordered newest first

### 3. Team Builder

#### Configuration (defaults, potentially configurable later)
- Participating players: **12** (default)
- Number of teams: **2** (default)
- Players per team: derived — `participating / teams = 6`

#### Step 1 — Select Participants
- Page shows all players in the database
- Admin selects exactly N players (default 12) who are attending this session
- *(Future: players self-select via login)*

#### Step 2 — Auto-Balance Teams
Algorithm randomly distributes selected players into teams while optimising for fairness:

**"High value" definition — relative to the current group of participants:**
- For each attribute, compute the group average across all N participants
- The **top 4 players** by a given attribute are considered "strong" in that attribute
- This is relative — adapts automatically to whatever skill level shows up that session
- The UI highlights these top 4 players and displays the group average per attribute

**Fairness criteria (used for team scoring/balancing):**

The algorithm runs in priority order:

1. **Identify dominant players** — rank all participants by `overall`. A "dominant" player is one who ranks top in multiple attributes simultaneously (e.g. top-4 PAC _and_ top-4 DEF).
2. **Each player counts as anchor for exactly one attribute** — their strongest attribute wins; they do not claim anchor slots in other categories. This prevents a single player from "locking" multiple fairness constraints for one team.
3. **Assign dominant players first** — the strongest dominant player is placed on Team A. Team B then receives **priority pick** of the top-ranked players in the remaining anchor categories (e.g. if Team A's dominant player leads in PAC+DEF, Team B gets the best available DEF anchor and best available PAC anchor from the remaining pool).
4. **Fill remaining anchor slots** — top 4 PAC and top 4 DEF (after anchor deduplication) are split 2–2 across teams.
5. **Balance the rest** — remaining players are assigned to minimise the per-attribute sum difference across all 6 FIFA stats.

**Result goal:** no single player imbalances a team. The team that gets the dominant all-rounder receives the weakest remaining players in that player's dominant attributes; the opposing team gets the best compensatory anchors in those same attributes.

**Displayed but not used for balance scoring:**
- Average age per team
- Average fitness per team

#### Step 3 — Pitch View
- Teams are displayed on a visual football pitch
- Player cards are positioned by role tendency:
  - High DEF → placed further back
  - High PAC / SHO / DRI → placed further forward
- Each team: 1 GK, 4 field players, 1 substitute

#### Step 4 — Accept & Save
- Admin reviews the generated teams
- On acceptance, the team composition is **persisted** (Supabase)
- Saved composition includes: session date, list of players per team, all computed stats at time of saving

### Saved Session

| Field          | Type      | Notes                                       |
|----------------|-----------|---------------------------------------------|
| id             | uuid      |                                             |
| date           | date      | The actual matchday (entered by admin)      |
| team_a         | array     | Player IDs + snapshot of stats              |
| team_b         | array     | Player IDs + snapshot of stats              |
| score_a        | number    | Goals scored by Team A (entered after game) |
| score_b        | number    | Goals scored by Team B (entered after game) |
| accepted_by    | string    | Admin name (no auth, entered manually)      |
| created_at     | datetime  |                                             |

---

## 4. Attribute Legend

A reference page (or tooltip/overlay) that translates numeric attribute values into plain-language descriptions, so players and admins understand what a value actually means in practice.

- Covers all 7 attributes: PAC, SHO, PAS, DRI, DEF, PHY, TEC
- Each attribute has ~4 ranges (e.g. 80–100 / 70–79 / 50–69 / below 50) with a short, football-context description written for hobby players — no jargon
- Example for DRI:
  - 80–100: Wins most 1v1 duels, rarely loses the ball when dribbling
  - 70–79: (TBD)
  - 50–69: Can win a dribble occasionally when the momentum is right; rarely gets past a good defender
  - 30–49: Dribbles too often and unnecessarily, frequently loses possession
- TEC legend is already defined:
  - 80–100: Can control even difficult balls cleanly. Consistently good first touch
  - 60–79: First touch often decent. Needs at most two contacts to bring the ball under control
  - 40–59: Needs multiple touches to receive and control a pass. Slows the game down. Often requires three or more contacts
  - below 40: Struggles to control the ball, makes frequent trapping errors
- Remaining attributes (PAC, SHO, PAS, DRI, DEF, PHY): **content to be written with AI assistance** when this feature is implemented

---

## 5. Matchday Result Entry

- After a session, admin can enter the final score (goals per team)
- Date of the matchday is also entered by the admin (not necessarily today)
- Score is optional at session creation — can be filled in later

---

## 5. Player Match History

- Each player card/profile shows their **last 5 match results** (W / D / L + score)
- Result is derived from the saved session: which team the player was on, what the score was
- Purpose: if a player has been losing repeatedly, the team builder should (and is designed to) compensate — but seeing the history makes this transparent
- **Result ranking (UX):** D is the best possible outcome — it means the teams were perfectly balanced. UI should reflect this: D gets a positive/celebratory treatment, not a neutral one. W is good, L is bad.

---

## Constraints

- No authentication — fully public app
- All data via Supabase JS client (browser only, no SSR)
- Static hosting on GitHub Pages
