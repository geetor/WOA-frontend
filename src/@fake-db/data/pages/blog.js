import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  // blog list
  blogList: [
    {
      id: 1,
      img: require('@/assets/images/slider/02.jpg'),
      title: 'The Best Features Coming to iOS and Web design',
      avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      userFullName: 'Ghani Pradita',
      blogPosted: 'Jan 10, 2020',
      tags: ['Quote', 'Fashion'],
      excerpt: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream.',
      comment: 76,
    },
    {
      id: 2,
      img: require('@/assets/images/slider/06.jpg'),
      title: 'Latest Quirky Opening Sentence or Paragraph',
      avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
      userFullName: 'Jorge Griffin',
      blogPosted: 'Jan 10, 2020',
      tags: ['Gaming', 'Video'],
      excerpt: 'Apple pie caramels lemon drops halvah liquorice carrot cake. Tiramisu brownie lemon drops.',
      comment: 2100,
    },
    {
      id: 3,
      img: require('@/assets/images/slider/04.jpg'),
      title: 'Share an Amazing and Shocking Fact or Statistic',
      avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      userFullName: 'Claudia Neal',
      blogPosted: 'Jan 10, 2020',
      tags: ['Gaming', 'Food'],
      excerpt: 'Tiramisu jelly-o chupa chups tootsie roll donut wafer marshmallow cheesecake topping.',
      comment: 243,
    },
    {
      id: 4,
      img: require('@/assets/images/slider/03.jpg'),
      title: 'Withhold a Compelling Piece of Information',
      avatar: require('@/assets/images/portrait/small/avatar-s-14.jpg'),
      userFullName: 'Fred Boone',
      blogPosted: 'Jan 10, 2020',
      tags: ['Video'],
      excerpt: 'Croissant apple pie lollipop gingerbread. Cookie jujubes chocolate cake icing cheesecake.',
      comment: 10,
    },
    {
      id: 5,
      img: require('@/assets/images/slider/09.jpg'),
      title: 'Unadvertised Bonus Opening: Share a Quote',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Billy French',
      blogPosted: 'Jan 10, 2020',
      tags: ['Quote', 'Fashion'],
      excerpt: 'Muffin liquorice candy soufflé bear claw apple pie icing halvah. Pie marshmallow jelly.',
      comment: 319,
    },
    {
      id: 6,
      img: require('@/assets/images/slider/10.jpg'),
      title: 'Ships at a distance have Every Man’s Wish on Board',
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
    blog: {
      img: require('@/assets/images/doc-center/troop.jpg'),
      title: ' ',
      avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      userFullName: 'Ghani Pradita',
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
      comments: 19100,
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
    userFullName: 'Chad Alexander',
    createdTime: 'May 24, 2020',
    blogTitle: 'The Best Features Coming to iOS and Web design',
    blogCategories: ['Fashion', 'Gaming'],
    slug: 'the-best-features-coming-to-ios-and-web-design',
    status: 'Published',
    excerpt:
      '<p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p><p><br></p><p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>',
    featuredImage: require('@/assets/images/slider/03.jpg'),
  },
}
/* eslint-disable global-require */
mock.onGet('/blog/list/data').reply(() => [200, data.blogList])
mock.onGet('/blog/list/data/sidebar').reply(() => [200, data.blogSidebar])
mock.onGet('/blog/list/data/detail').reply(() => [200, data.blogDetail])
mock.onGet('/blog/list/data/edit').reply(() => [200, data.blogEdit])
