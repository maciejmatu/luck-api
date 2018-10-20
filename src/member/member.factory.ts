import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IMember } from './member.model';
import { Member } from './member';
import { UuidGenerationService } from './uuid-generation.service';
import { RoleType } from './event-member-role/event-member-role.model';
import { EventMemberRole } from './event-member-role/event-member-role';
import { Organiser } from './event-member-role/organiser/organiser';
import { Participant } from './event-member-role/participant/participant';

@injectable()
export class MemberFactory {

    constructor(
        private uuidGenerationService: UuidGenerationService,
        @inject(IDENTIFIER.DIFactoryMember) private DIFactoryMember: (option: IMember) => Member) {
    }

    public create(relationId: string, type: RoleType, name?: string): Member {
        const id = this.uuidGenerationService.createNewUuid();
        const uniqueLink = `www.luck.com/${relationId}`;
        const eventMemberRole = this.createEventMemberRole(type);

        return this.DIFactoryMember({ id, relationId, name, uniqueLink, eventMemberRole })
    }

    public recreate(option: IMember): Member {
        return this.DIFactoryMember(option);
    }

    private createEventMemberRole(type: RoleType): EventMemberRole {
        if (type === RoleType.ORGANISER) {
            return new Organiser();
        }

        if (type === RoleType.PARTICIPANT) {
            return new Participant();
        }
    }
}
