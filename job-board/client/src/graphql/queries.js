import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetail on Job {
        id
        title
        description
        company {
            id
            name
        }
    }
`;

export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_QUERY = gql`
    query JobsQuery {
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }
`;

export const COMPANY_QUERY = gql`
    query CompanyQuery($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }
`;

export const CREATE_JOB_MUTATION = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export async function deleteJob(id) {
    const mutation = gql`
        mutation DeleteJobMutation($id: ID!) {
            job: deleteJob(id: $id) {
                id
            }
        }
    `;

    const variables = { id: id };
    const context = {
        headers: { Authorization: 'Bearer ' + getAccessToken() },
    };
    const {
        data: { job },
    } = await client.mutate({ mutation, variables, context });
    return job;
}

export async function update(input) {
    const mutation = gql`
        mutation UpdateJobMutation($input: UpdateJobInput!) {
            job: updateJob(input: $input) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
    `;

    const variables = { input };
    const context = {
        headers: { Authorization: 'Bearer ' + getAccessToken() },
    };
    const {
        data: { job },
    } = await client.mutate({ mutation, variables, context });
    return job;
}
