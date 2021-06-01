<template>
  <div class="home-content">
    <h1>Home</h1>
    <div class="home-lists">
      <b-card border-variant="warning" title="Tabela" class="home-list-bank">
        <b-table
          id="result-table"
          striped
          hover
          bordered
          :items="teams"
          :fields="tableFields"
        >
          <template #cell(index)="data">{{ data.index + 1 }}</template>
          <template #cell(name)="data"
            ><img class="icon" :src="data.item.logoUrlSvg" />
            {{ data.item.name }}</template
          >
          <template #cell(points)="data">{{ data.item.points }}</template>
          <template #cell(games)="data"> {{ data.item.games }}</template>
          <template #cell(wins)="data"> {{ data.item.wins }}</template>
          <template #cell(draws)="data"> {{ data.item.draws }}</template>
          <template #cell(loses)="data"> {{ data.item.loses }}</template>
          <template #cell(favorPoints)="data">
            {{ data.item.favorPoints }}</template
          >
          <template #cell(againstPoints)="data">
            {{ data.item.againstPoints }}</template
          >
          <template #cell(pointsBalance)="data">
            {{ data.item.pointsBalance }}</template
          >
          <template #cell(percentage)="data">
            {{ data.item.percentage }}</template
          >
        </b-table>
      </b-card>
      <b-card border-variant="warning" title="Jogos" class="home-list-fixtures">
        <b-card
          class="card-fixture"
          v-for="fixture in fixtures"
          :key="fixture.id"
        >
          <div class="fixture-team fixture-team-home">
            <div class="fixture-team-logo">
              <img class="fixture-logo" :src="fixture.homeLogo" />
            </div>
            <div class="fixture-team-name">{{ fixture.homeTeamName }}</div>
          </div>

          <div
            :class="
              fixture.homeTeamPoints > fixture.awayTeamPoints
                ? 'fixture-points fixture-points-win'
                : 'fixture-points fixture-points-lose'
            "
          >
            {{ fixture.homeTeamPoints }}
          </div>

          <div class="fixture-versus">x</div>

          <div
            :class="
              fixture.awayTeamPoints > fixture.homeTeamPoints
                ? 'fixture-points fixture-points-win'
                : 'fixture-points fixture-points-lose'
            "
          >
            {{ fixture.awayTeamPoints }}
          </div>

          <div class="fixture-team fixture-team-away">
            <div class="fixture-team-logo">
              <img class="fixture-logo" :src="fixture.awayLogo" />
            </div>
            <div class="fixture-team-name">{{ fixture.awayTeamName }}</div>
          </div>
        </b-card>
      </b-card>
    </div>
  </div>
</template>

<script>
// import { format } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  data() {
    return {
      tableFields: [
        {
          key: "index",
          label: "Posição",
        },
        {
          key: "name",
          label: "Equipe",
        },
        {
          key: "points",
          label: "Pts",
        },
        {
          key: "games",
          label: "J",
        },
        {
          key: "wins",
          label: "V",
        },
        {
          key: "draws",
          label: "E",
        },
        {
          key: "loses",
          label: "D",
        },
        {
          key: "favorPoints",
          label: "PP",
        },
        {
          key: "againstPoints",
          label: "PC",
        },
        {
          key: "againstPoints",
          label: "PC",
        },
        {
          key: "pointsBalance",
          label: "SP",
        },
        {
          key: "percentage",
          label: "%",
        },
      ],
      teams: [],
      fixtures: [],
      round: 1,
    };
  },
  methods: {
    async loadTeams() {
      try {
        const response = await api.get("/schedule");

        if (response && response.data !== null) {
          this.teams = response.data;
        }
      } catch (err) {
        showError(err);
        return;
      }
    },
    async loadFixtures() {
      try {
        const response = await api.get(`/fixtures`, {
          params: {
            round: this.round,
          },
        });

        if (response && response.data !== null) {
          this.fixtures = response.data;
        }
      } catch (err) {
        showError(err);
        return;
      }
    },
  },
  async mounted() {
    this.loadTeams();
    this.loadFixtures();
  },
};
</script>

<style>
.home-content > h1 {
  text-align: center;
}

.home-lists {
  display: flex;
  justify-content: space-between;
  margin: 50px;
}

.home-list-bank {
  width: 55%;
}

.home-list-fixtures {
  width: 44%;
}

.icon {
  height: 30px;
}

.card-fixture {
  margin-top: 15px;
}

.card-fixture > .card-body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.fixture-team {
  width: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fixture-team-home {
  justify-content: flex-start;
}

.fixture-team-away {
  justify-content: flex-end;
}

.fixture-team-name {
  font-size: 0.8rem;
  margin-left: 5px;
}

.fixture-versus {
  width: 2%;
  text-align: center;
  font-family: "Roboto Slab";
  font-size: 0.8rem;
  font-weight: normal;
}

.fixture-team-logo,
.fixture-logo {
  height: 30px;
}

.fixture-points {
  font-family: "Roboto Slab";
  font-weight: bold;
  font-size: 1.4rem;
  margin: 10px;
}

.fixture-points-win {
  color: green;
}

.fixture-points-lose {
  color: red;
}
</style>