 #!/bin/bash
component=$1
mkdir $component
cd $component

# create Handler
upper=$(tr '[:lower:]' '[:upper:]' <<< ${component:0:1})${component:1}
class=$upper"Handler"
echo "import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';

import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK,
    NOT_FOUND
} from '@constants/http-statuses';

import model from './$component.model';

class $class implements IHandler {
    create = async (req: eRequest, res: eResponse) => {
        return;
    };

    get = async (req: eRequest, res: eResponse) => {
        return;
    };

    getAll = async (req: eRequest, res: eResponse) => {
        return;
    };

    put = async (req: eRequest, res: eResponse) => {
        return;
    };

    delete = async (req: eRequest, res: eResponse) => {
        return;
    };
}

export default new $class();" >> $component.handler.ts

# create Model
class=$upper"Model"
modelParameters="$component: I$upper"
echo "import database from '@database';
import {n} from '@helpers/sqlite';

class $class implements IModel<IResultQuery> {
    get selectAllQuery() {
        return \`
            SELECT
        \`;
    }

    create = async ($modelParameters): Promise<IResultQuery> => {
        return database.run(\`
            INSERT INTO
        \`);
    };

    delete = async ($modelParameters): Promise<IResultQuery> => {
        return database.run(\`
            UPDATE
        \`);
    };

    read = async ($modelParameters): Promise<IResultQuery<I$upper>> => {
        return database.get<I$upper>(\`
            \${this.selectAllQuery}
        \`);
    };

    readAll = async (): Promise<IResultQuery<I$upper[]>> => {
        return database.all<I$upper[]>(\`
            \${this.selectAllQuery}
        \`);
    };

    update = async ($modelParameters): Promise<IResultQuery> => {
        return database.run(\`
            UPDATE SET
        \`);
    };
}

export default new $class();" >> $component.model.ts

# create Routes
echo "import express from 'express';
import handler from './$component.handler';

const router = express.Router();

export default router;" >> $component.routes.ts

# create types
echo "interface I$upper {
    id?: number
}" >> $component.types.ts

cd ..
