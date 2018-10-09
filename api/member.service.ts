import {RelationMemberHappeningRepository} from '../relation-member-happening/relation-member-happening.repository';
import {MemberRepository} from '../member/member.repository';
import {HappeningRepository} from '../happening/happening.repository';
import {IMemberInformationView} from './member-information-view.model';

export class MemberService {
    constructor(
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private memberRepository: MemberRepository,
        private happeningRepository: HappeningRepository) {
    }

    public getMemberInformationView(id: string): IMemberInformationView {
        const relation = this.relationMemberHappeningRepository.get(id);
        const member = this.memberRepository.getByIndex(relation.memberId);
        const happening = this.happeningRepository.getByIndex(relation.happeningId);

        return {
            member, happening
        }
    }
}
