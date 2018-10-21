import * as assert from 'assert';
import { Container } from 'inversify';
import { DIContainerProvider } from '../di-container';
import { Happening } from '../happening/happening';
import { MEMBER_INITIAL_LIST_MOCK } from './member.mock';
import { RoleType } from './event-member-role/event-member-role.model';
import { HappeningFactory } from '../happening/happening.factory';
import IDENTIFIER from '../identifiers';


describe('Member', function () {
    let DIContainer: Container;
    let happeningFactory: HappeningFactory;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = DIContainerProvider([...MEMBER_INITIAL_LIST_MOCK]);
        happeningFactory = DIContainer.get<HappeningFactory>(IDENTIFIER.HappeningFactory);
        happening = happeningFactory.create();
    });

    describe('Creating new members', function () {
        it('Added member should be unique relationId ', function () {
            const billMember = happening.addMember('a0a1522b-76d3-467d-9491-d16102216e10', RoleType.PARTICIPANT);

            assert.notStrictEqual(billMember.relationId, null);
        });
    });
});
