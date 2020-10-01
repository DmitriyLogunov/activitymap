import React, {useEffect, useState} from 'react';
import ActivityQuery from "../models/ActivityQuery";
import {SummaryActivity} from "../classes/strava/models";
import Activity from "../models/Activity";
import {Strava} from "../classes/strava/Strava";
import {getToken} from "../models/AuthenticationData";
import FilteredActivities from "../classes/FilteredActivities";

interface SavedQueryResponse {
  query: ActivityQuery,
  data: Array<SummaryActivity>,
}

interface ActivityLoaderProps {
  queries: Array<ActivityQuery>;
  onActivitiesUpdate: (newActivities: FilteredActivities) => void
}

interface ActivityLoaderState {
  savedResponses: Array<SavedQueryResponse | null>;
}

const ActivityLoader = (props: ActivityLoaderProps) => {
  const [state, setState] = useState<ActivityLoaderState>({
    savedResponses: [],
  });

  const queries = props.queries;

  useEffect(() => {
    const saveActivityResponse = (query: ActivityQuery, index: number, data: Array<SummaryActivity>) => {
      const newSavedResponses = state.savedResponses.slice();

      while (index >= newSavedResponses.length) {
        newSavedResponses.push(null);
      }

      newSavedResponses[index] = {
        query: query,
        data: data,
      }

      setState({
        ...state,
        savedResponses: newSavedResponses
      })
    }

    const getSavedActivityQueryResponse = (query: ActivityQuery, index: number): Array<SummaryActivity> | null => {
      const savedResponse = state.savedResponses[index];
      if (savedResponse) {
        if (query.key === savedResponse.query.key) {
          return savedResponse.data;
        }
      }

      return null;
    }

    (async () => {
      let newActivities: FilteredActivities = new FilteredActivities();
      await Promise.all(
        queries.map(async (query, index: number) => {
          let savedResponse = getSavedActivityQueryResponse(query, index);

          if (savedResponse) {
            newActivities.addFromArray(savedResponse);
          } else {
            // const returnedActivities: Array<Activity> = await StravaAPI.get('/athlete/activities');
            const [token] = getToken();
            if (token) {
              const stravaApi = new Strava(token);
              const selector = query.getSelector();
              switch (selector.type) {
                case "latest":
                  const athleteActivities: Array<Activity> = await stravaApi.getLoggedInAthleteActivities(undefined,undefined,undefined,selector.count);
                  newActivities.addFromArray(athleteActivities);
                  saveActivityResponse(query, index, athleteActivities);
                  break;
              }
            }
          }
        })
      );

      props.onActivitiesUpdate(newActivities);
    })();
  }, [queries]);

  return <></>;
}

export default ActivityLoader;