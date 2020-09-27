import React, {useEffect, useState} from 'react';
import ActivityQuery from "../models/ActivityQuery";
import {SummaryActivity} from "../classes/strava/models";
import Activity, {Activities} from "../models/Activity";
import StravaAPI from "../classes/strava/StravaAPI";

interface SavedQueryResponse {
  query: ActivityQuery,
  data: Array<SummaryActivity>,
}

interface ActivityLoaderProps {
  queries: Array<ActivityQuery>;
  onActivitiesUpdate: (newActivities: Activities) => void
}

interface ActivityLoaderState {
  savedResponses: Array<SavedQueryResponse | null>;
}

const ActivityLoader = (props: ActivityLoaderProps) => {
  const [state, setState] = useState<ActivityLoaderState>({
    savedResponses: [],
  });

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
      const newActivities: Activities = new Activities();
      await Promise.all(
        props.queries.map(async (query, index: number) => {
          let savedResponse = getSavedActivityQueryResponse(query, index);

          if (savedResponse) {
            newActivities.add(savedResponse);
          } else {
            const returnedActivities: Array<Activity> = await StravaAPI.get('/athlete/activities');
            newActivities.add(returnedActivities);
            saveActivityResponse(query, index, returnedActivities);
          }
        })
      );

      props.onActivitiesUpdate(newActivities);
    })();
  }, [props.queries]);

  return <></>;
}

export default ActivityLoader;