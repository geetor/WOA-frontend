import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  // blog list
  blogList: [
    {
      id: 1,
      img: require('@/assets/images/slider/02.jpg'),
      title: '奋力实现“十四五”时期国防和军队建设良好开局',
      avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      userFullName: '乌铭琪',
      blogPosted: '2021-3-21',
      tags: ['Guard', 'Military'],
      excerpt: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream.',
      comment: 76,
    },
    {
      id: 2,
      img: require('@/assets/images/slider/06.jpg'),
      title: '中央军委办公厅发出通知要求解放军和武警部队 传达学习十三届全国人大四次会议精神',
      avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
      userFullName: 'Jorge Griffin',
      blogPosted: '2021-2-22',
      tags: ['Gaming', 'Video'],
      excerpt: 'Apple pie caramels lemon drops halvah liquorice carrot cake. Tiramisu brownie lemon drops.',
      comment: 2100,
    },
    {
      id: 3,
      img: require('@/assets/images/slider/04.jpg'),
      title: '中央军委办公厅印发《关于新时代军队弘扬优良传统厉行节约反对浪费的意见》',
      avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      userFullName: 'Claudia Neal',
      blogPosted: '2020-7-31',
      tags: ['Gaming', 'Food'],
      excerpt: 'Tiramisu jelly-o chupa chups tootsie roll donut wafer marshmallow cheesecake topping.',
      comment: 243,
    },
    {
      id: 4,
      img: require('@/assets/images/slider/03.jpg'),
      title: '中央军委办公厅印发《军队领导干部经济责任审计规定》',
      avatar: require('@/assets/images/portrait/small/avatar-s-14.jpg'),
      userFullName: 'Fred Boone',
      blogPosted: '2020-6-22',
      tags: ['Video'],
      excerpt: 'Croissant apple pie lollipop gingerbread. Cookie jujubes chocolate cake icing cheesecake.',
      comment: 10,
    },
    {
      id: 5,
      img: require('@/assets/images/slider/09.jpg'),
      title: '中央军委办公厅印发《关于军队开展巡察工作的意见》',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Billy French',
      blogPosted: '2020-4-20',
      tags: ['Quote', 'Fashion'],
      excerpt: 'Muffin liquorice candy soufflé bear claw apple pie icing halvah. Pie marshmallow jelly.',
      comment: 319,
    },
    {
      id: 6,
      img: require('@/assets/images/slider/10.jpg'),
      title: '《关于加快推动军队资源配置标准化工作的意见》印发',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: '2019-12-8',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500,
    },
    {
      id: 7,
      img: require('@/assets/images/slider/10.jpg'),
      title: '军办要求传达学习十三届全国人大二次会议精神',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: '2019-8-3',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500,
    },
    {
      id: 8,
      img: require('@/assets/images/slider/10.jpg'),
      title: '中央军委办公厅印发《新时代军史场馆体系建设规划》',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: '2019-1-12',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500,
    },
    {
      id: 9,
      img: require('@/assets/images/slider/10.jpg'),
      title: '激励全军干部新时代新担当新作为实施意见印发',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: 'Jan 10, 2020',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500,
    },
    {
      id: 10,
      img: require('@/assets/images/slider/10.jpg'),
      title: '《关于进一步激励全军广大干部新时代新担当新作为的实施意见》印发',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: '2019-1-2',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500,
    },
    {
      id: 11,
      img: require('@/assets/images/slider/10.jpg'),
      title: '军委办公厅某中心：把战斗队思想刻进心坎',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: 'Jan 10, 2020',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500,
    },
  ],

  // sidebar
  blogSidebar: {
    recentPosts: [
      {
        id: 7,
        img: require('@/assets/images/banner/banner-22.jpg'),
        title: 'Why Should Forget Facebook?',
        createdTime: 'Jan 14 2020',
      },
      {
        id: 8,
        img: require('@/assets/images/banner/banner-27.jpg'),
        title: 'Publish your passions, your way',
        createdTime: 'Mar 04 2020',
      },
      {
        id: 9,
        img: require('@/assets/images/banner/banner-39.jpg'),
        title: 'The Best Ways to Retain More',
        createdTime: 'Feb 18 2020',
      },
      {
        id: 10,
        img: require('@/assets/images/banner/banner-35.jpg'),
        title: 'Share a Shocking Fact or Statistic',
        createdTime: 'Oct 08 2020',
      },
    ],
    categories: [
      { category: 'Fashion', icon: 'WatchIcon' },
      { category: 'Food', icon: 'ShoppingCartIcon' },
      { category: 'Gaming', icon: 'CommandIcon' },
      { category: 'Quote', icon: 'HashIcon' },
      { category: 'Video', icon: 'VideoIcon' },
    ],
  },

  // detail
  blogDetail: {
    blogs:[
      {
        img: require('@/assets/images/doc-center/troop.jpg'),
        title: ' ',
        avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
        userFullName: '新华社',
        createdTime: 'Jan 10, 2020',
        tags: ['Gaming', 'Video'],
        content:
          `<h2 class="doc-title">奋力实现“十四五”时期国防和军队建设良好开局</h2>
         <p>新蓝图前景美好，新征程催人奋进。十三届全国人大四次会议和全国政协十三届四次会议完成预定的各项议程，相继胜利闭幕。解放军和武警部队官兵对会议圆满成功表示热烈祝贺！</p>
         <p>今年的两会，是在庆祝我们党百年华诞的重大时刻、“两个一百年”奋斗目标历史交汇的关键节点、“十四五”开局之年召开的重要会议。两会的成功召开，对于进一步统一思想、坚定信心、凝聚力量，鼓舞和动员全党全军全国各族人民更加紧密地团结在以习近平同志为核心的党中央周围，齐心协力推动“十四五”时期高质量发展，确保全面建设社会主义现代化国家开好局、起好步，具有十分重要意义。会议审议并批准的政府工作报告，总结成绩令人振奋，工作举措务实有力，是一个凝心聚气、攻坚克难、开新图强的好报告。审查和批准的国民经济和社会发展第十四个五年规划和2035年远景目标纲要，通过的《全国人民代表大会关于完善香港特别行政区选举制度的决定》等，充分体现了党的主张和人民意志的统一。出席会议的军队人大代表、政协委员，以强烈的责任感使命感，着眼党和国家战略全局、长远发展，聚焦国防和军队现代化，紧扣军队建设、改革和军事斗争准备方面的大事要事，认真履行职责，积极建言献策，以自身良好形象展现出军队代表委员的好样子和强军兴军新风貌。</p>
         <p>开局重在引领，决胜贵在谋划。这次会议审查和批准的国民经济和社会发展第十四个五年规划和2035年远景目标纲要，坚持以习近平新时代中国特色社会主义思想为指导，全面贯彻《中共中央关于制定国民经济和社会发展第十四个五年规划和二〇三五年远景目标的建议》精神，体现了立足新发展阶段、贯彻新发展理念、构建新发展格局、推动高质量发展的要求，集中了全党全军全国各族人民的智慧，实化量化了“十四五”时期经济社会发展主要目标和重大任务。贯彻落实好规划纲要，我们必将在全面建设社会主义现代化国家新征程上干出新气象、干出新成效。</p>
         <p>开局关系全局，起步决定后势。习主席在出席解放军和武警部队代表团全体会议时，就做好“十四五”时期国防和军队建设开局起步工作作出重大战略部署，对抓好常态化疫情防控、巩固和发展军政军民团结、统筹好建设和备战关系提出明确要求。习主席的重要讲话是对国防和军队现代化建设新“三步走”的再发动、再部署，具有很强的思想性、针对性、指导性，为我军聚焦实现建军100年奋斗目标、实现“十四五”时期国防和军队建设良好开局指明了前进方向，提供了根本遵循。</p>
         <p>实干才能跟上时代步伐，奋进才能抓住历史机遇。全军要深入学习贯彻习主席重要讲话精神，紧紧围绕我军建设“十四五”规划布局谋划和推进工作。要坚持以战领建，加强战建统筹，抓紧推进战略性、引领性、基础性重大工程，加快打造高水平战略威慑和联合作战体系。要强化创新驱动，以更大力度、更实举措加快科技自立自强，充分发挥科技对我军建设战略支撑作用；按照既定部署扎实推进国防和军队改革，不断释放改革效能。要加强战略管理，优化项目论证方式和立项审批流程，加强重大项目统筹调控，强化规划计划权威性和执行力。要发扬军爱民、民拥军光荣传统，巩固和发展军政军民团结，汇聚强国兴军强大力量。要统筹好建设和备战关系，做好随时应对各种复杂困难局面的准备，坚决维护国家主权、安全、发展利益，为全面建设社会主义现代化国家提供坚强支撑。要增强责任感、紧迫感、主动性，强化责任担当、弘扬实干精神，把我军建设年度计划安排的各项工作往前赶、往实里抓，确保早日落地见效。</p>
         <p>春风浩荡满目新，砥砺奋进正当时。我们已经迈上新的征程，迎来新的出发。全军要坚持以习近平新时代中国特色社会主义思想为指导，深入贯彻习近平强军思想，深入贯彻新时代军事战略方针，增强“四个意识”、坚定“四个自信”、做到“两个维护”，贯彻军委主席负责制，坚持政治建军、改革强军、科技强军、人才强军、依法治军，聚力练兵备战，锐意开拓进取，坚决履行党和人民赋予的新时代使命任务，为实现党在新时代的强军目标、把人民军队全面建成世界一流军队不懈奋斗，以优异成绩迎接建党100周年。</p>
        `,
        comments: 19235,
        bookmarked: 139,
        UserComment: [
          {
            avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            fullName: '刘涛',
            comment:
              `
              紧密团结在以习近平同志为核心的党中央周围，高举中国特色社会主义伟大旗帜，为实现中华民族伟大复兴的中国梦而努力奋斗!
            `
          },
        ],
      },
      {
        img: require('@/assets/images/doc-center/troop.jpg'),
        title: ' ',
        avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
        userFullName: '新华社',
        createdTime: 'Jan 10, 2020',
        tags: ['Gaming', 'Video'],
        content:
          `
            <h3 class="doc-title">中央军委办公厅发出通知要求解放军和武警部队 传达学习十三届全国人大四次会议精神</h3>
            <p>新华社北京3月12日电</p> 
            <p>中央军委办公厅日前发出通知，要求解放军和武警部队认真传达学习十三届全国人大四次会议精神，认真学习贯彻习主席在解放军和武警部队代表团全体会议上的重要讲话精神。</p>
            <p>通知指出，习主席在解放军和武警部队代表团全体会议上的重要讲话，对过去一年国防和军队建设取得的成绩给予充分肯定，对实现“十四五”时期国防和军队建设良好开局提出明确要求。要认真抓好大会精神学习贯彻，把学好习主席重要讲话精神突出出来，充分认清“十三五”时期党、国家和军队事业取得的辉煌成就，特别是去年以来新冠肺炎疫情防控取得重大战略成果、脱贫攻坚战取得全面胜利、决胜全面建成小康社会取得决定性成就，深刻认识党的领导和我国社会主义制度的显著优势，进一步坚定对习近平新时代中国特色社会主义思想的政治信仰，坚定对党中央、习主席的信赖拥戴；充分认清“十四五”规划和2035年远景目标纲要是引领我国未来发展的宏伟蓝图和行动纲领，必须增强立足新发展阶段、贯彻新发展理念、构建新发展格局的信心底气；充分认清完善香港选举制度是推进“一国两制”事业、保持香港长治久安的实际需要，必须进一步强化维护国家主权、安全、发展利益的使命忧患。要深刻认识我军建设“十四五”规划开局起步的重要性和紧迫性，坚持以战领建，强化创新驱动，加强战略管理，巩固和发展军政军民团结，把我军建设年度计划安排的各项工作往前赶、往实里抓。尤其要深刻认识当前我国安全形势不稳定性不确定性较大，必须统筹好建设和备战关系，做好随时应对各种复杂困难局面的准备。</p>
            <p>通知强调，要把学习大会精神特别是习主席重要讲话精神，纳入团级以上单位党委理论学习中心组学习、部队思想政治教育和院校政治理论课教学，深入开展宣讲辅导、专题研讨、热点解读，切实统一思想和行动。要围绕庆祝建党百年加强我军党的领导和党的建设，进一步增强“四个意识”、坚定“四个自信”、做到“两个维护”，贯彻军委主席负责制，一切行动听从党中央、中央军委和习主席指挥。要扎实抓好练兵备战工作，深入推进军事训练转型，打造新型军事人才方阵。要强化责任担当、弘扬实干精神，推动规划建设任务落地见效，以优异成绩迎接中国共产党建党100周年。</p>
          `,
        comments: 186,
        bookmarked: 139,
        UserComment: [
          {
            avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            fullName: '刘涛',
            comment:
              `
              紧密团结在以习近平同志为核心的党中央周围，高举中国特色社会主义伟大旗帜，为实现中华民族伟大复兴的中国梦而努力奋斗!
            `
          },
        ],
      }
    ],

    comments: [
      {
        avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
        userFullName: '刘涛',
        commentedAt: 'May 24, 2020',
        commentText:
          `
            要紧密团结在以习近平同志为核心的党中央周围，始终高举中国特色社会主义伟大旗帜，为实现中华民族伟大复兴的中国梦而努力奋斗!
          `
      },
    ],
  },

  // edit
  blogEdit: {
    avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
    userFullName: '管理员 刘涛',
    createdTime: 'May 24, 2020',
    blogTitle: '',
    blogCategories: ['Fashion', 'Gaming'],
    slug: 'the-best-features-coming-to-ios-and-web-design',
    rank: '6',
    excerpt:` `,
    featuredImage: require('@/assets/images/slider/03.jpg'),
    blogType:'',
    modifiedTime:'',
    blogSubject:'',
    dept:{},
  },

  blogNews:[
    {
      id:1,
      title:'全国政协举行新年茶话会 习近平发表重要讲话',
      reporter:'李晶',
      content:
        `
          <p>新华社北京12月31日电 中国人民政治协商会议全国委员会12月31日上午在全国政协礼堂举行新年茶话会。党和国家领导人习近平、李克强、栗战书、汪洋、王沪宁、赵乐际、韩正、王岐山等同各民主党派中央、全国工商联负责人和无党派人士代表、中央和国家机关有关方面负责人以及首都各族各界人士代表欢聚一堂，共迎2021年元旦。</p>
          <p>中共中央总书记、国家主席、中央军委主席习近平在茶话会上发表重要讲话。他强调，即将到来的2021年，我们将隆重庆祝中国共产党成立100周年，制定和实施“十四五”规划，开启全面建设社会主义现代化国家新征程。我们要深刻铭记中国人民和中华民族为实现民族独立、人民解放和国家富强、人民幸福而奋斗的百年艰辛历程，发扬为民服务孺子牛、创新发展拓荒牛、艰苦奋斗老黄牛的精神，永远保持慎终如始、戒骄戒躁的清醒头脑，永远保持不畏艰险、锐意进取的奋斗韧劲，在全面建设社会主义现代化国家新征程上奋勇前进，以优异成绩庆祝中国共产党成立100周年。</p>
          <p>习近平代表中共中央、国务院和中央军委，向各民主党派、工商联和无党派人士、各人民团体，向全国广大工人、农民、知识分子、干部和各界人士，向人民解放军指战员、武警官兵、公安干警和消防救援队伍指战员，向香港特别行政区同胞、澳门特别行政区同胞、台湾同胞和海外侨胞，向关心和支持中国现代化建设的各国朋友，致以节日的问候和诚挚的祝福，祝大家新年好。</p>
          <p>习近平指出，2020年，面对错综复杂的国际国内形势，我们统筹中华民族伟大复兴战略全局和世界百年未有之大变局，团结带领全党全军全国各族人民披荆斩棘、攻坚克难，取得了新冠肺炎疫情防控重大战略成果，战胜了严重洪涝灾害，实现了经济增长由负转正，完成了新时代脱贫攻坚目标任务、“十三五”时期目标任务，重大科技项目、重大工程建设捷报频传，全面建成小康社会取得伟大历史成果，中华民族伟大复兴向前迈出了新的一大步。</p>
        `,
      link:'http://www.mod.gov.cn/leaders/2020-12/31/content_4876318.htm',
    },
    {
      id:2,
      title: '中俄两国元首互致新年贺电',
      reporter: '新华社',
      content: '敬请期待',
      link:'http://www.mod.gov.cn/leaders/2020-12/31/content_4876317.htm'
    },
    {
      id:3,
      title: '国家主席习近平发表二〇二一年新年贺词',
      reporter: '新华社',
      content: '敬请期待',
      link:'http://www.mod.gov.cn/leaders/2020-12/31/content_4876316.htm'
    },
    {
      id:4,
      title: '习近平：坚持把解决好“三农”问题作为全党工作重中之重',
      reporter: '新华社',
      content: '敬请期待',
      link:'http://www.mod.gov.cn/leaders/2020-12/29/content_4876148.htm'
    },
    {
      id:5,
      title: '习近平同俄罗斯总统普京通电话',
      reporter: '新华社',
      content: '敬请期待',
      link:'http://www.mod.gov.cn/leaders/2020-12/28/content_4876142.htm'
    }
  ]
}
/* eslint-disable global-require */
mock.onGet('/blog/list/data').reply(() => [200, data.blogList])
mock.onGet('/blog/list/data/sidebar').reply(() => [200, data.blogSidebar])
mock.onGet('/blog/list/data/detail').reply(() => [200, data.blogDetail.blogs])
mock.onGet('/blog/list/data/edit').reply(() => [200, data.blogEdit])
mock.onGet('blog/list/data/news').reply(()=>[200,data.blogNews])
