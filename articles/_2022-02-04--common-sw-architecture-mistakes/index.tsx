import { Code, H1, H2, Hellip, Italic, Li, List, P, Quote, Strong } from "../../src/components/article";

export const Article = () => (
  <>
    <P>
      Over the years I have reviewed many pull requests, mainly on projects of ~10 people where not all of team members.
      Here is collection of the most common mistakes I have seen or made by myself on front-end related projects.
    </P>

    <H1>1. Large never ending pull requests</H1>

    <P>This is probably the most common, it usually goes like this</P>

    <List>
      <Li>You get large product task, you work on it for weeks.</Li>
      <Li>
        You start getting behind, product starts asking when it will be done, so you start cranking more code with less
        quality.
      </Li>
      <Li>
        You <Quote>finish</Quote> the task and tell on standup that it is done and just needs review.
      </Li>
      <Li>
        Architects or senior members start reviewing the PR, it takes a long time (because it is super large) and they
        request lots of changes (because it is super large).
      </Li>
      <Li>
        You start addressing the changes and you will keep saying on standup that it is almost done
        <Hellip /> for another week or two.
      </Li>
      <Li>Nobody is happy.</Li>
    </List>

    <H2>How to prevent this</H2>

    <List>
      <Li>
        <Strong>Split the product tasks</Strong> into smaller deliverables. Talk with product if it would make sens to
        deliver the task not all at once but with smaller deliverables.
        <List>
          <Li>
            Dont
            <List>
              <Li>Profile screen task (one large task with lots of functionality)</Li>
            </List>
          </Li>
          <Li>
            Do
            <List>
              <Li>Profile screen with basic information</Li>
              <Li>Profile screen logout button</Li>
              <Li>Profile screen change password</Li>
            </List>
          </Li>
        </List>
      </Li>

      <Li>
        <Strong>Split the code</Strong> into several PRs. Either have the PRs as small product deliverables, if that is
        not possible,
        <Strong>introduce feature-flag</Strong>, which will allow you to merge to main without affecting the product (eg
        users seeing partially implemented profile page).
        <List>
          <Li>
            Dont
            <List>
              <Li>One profile screen PR with 5000 lines of changes</Li>
            </List>
          </Li>
          <Li>
            Do
            <List>
              <Li>PR 1: Profile screen shell with feature flag</Li>
              <Li>PR 2: Layout refactoring needed for the profile screen</Li>
              <Li>PR 3: Profile screen layout and basic data</Li>
              <Li>PR 4: Implement logout logic</Li>
              <Li>PR 5: Profile screen logout button</Li>
              <Li>PR 6: Add PasswordInput component</Li>
              <Li>PR 7: Profile screen password change</Li>
              <Li>PR 8: Profile screen enabled by removing feature flag</Li>
            </List>
          </Li>
        </List>
      </Li>

      <Li>
        <Strong>Talk with someone experienced</Strong> on the team about the task (ideally before you start working on
        the task), they will most likely tell bunch of important information like:
        <List>
          <Li>
            We dont have this button, ask designed if he really wants new button or of we can reuse the ones we already
            have.
          </Li>
          <Li>The profile page has the same layout as this other page, make sure to reuse the layout.</Li>
          <Li>These are new component that we do not have, you will need to implement them.</Li>
          <Li>Theming is missing in the ticket, but the app supports it everywhere, so it needs to be implemented.</Li>
          <Li>
            You will be extending these auth related modules, this are their shortcoming, so beware of them or refactor
            them while you are touching the code.
          </Li>
        </List>
      </Li>

      <Li>
        <Strong>Get feedback early</Strong>, by rule of thumb, if your <Strong>PR is bigger than 500 lines</Strong>, you
        have are getting into the danger territory, where you probably have a problem and you should apply some of the
        tricks above.
      </Li>
    </List>

    <P>
      All of these are rule of thump recommendations.{" "}
      <Strong>Some of the problems might be partially taken care of by some meetings</Strong>
      (like grooming, or some weekly product-developer syncs). The recommendation can be applied after you start working
      on the task, the main point is that{" "}
      <Strong>whenever you start seeing problems, you should be start talking about them</Strong> (thats what the
      stand-ups are for) and try to apply some of the rules above to fix them.
    </P>

    <H1>Naming things</H1>

    <P>Use better names instead of comments</P>

    <H2>Not great</H2>
    <Code language="ts">{`
      // Use only on TV
      const SCREEN_WIDTH_DIP = ...
      // Use only on mobile
      const SCREEN_WIDTH = ...

      const HIDE_MODAL_TIMEOUT = 10 // seconds
    `}</Code>

    <H2>Better</H2>
    <Code language="ts">{`
      const SCREEN_WIDTH_MOBILE = ...
      const SCREEN_WIDTH_TV = ...

      const HIDE_MODAL_TIMEOUT_SECONDS = 10
    `}</Code>

    <H1>Make sure the new code is in correct place</H1>

    <P>
      Always when adding new module/class/function/constant, think about if you placed it at the correct place. The most
      common mistake is to just place it where you are currently editing code, which is lots of the times correct, but
      lost of the time also incorrect.
    </P>

    <P>
      Most code bases have some architecture that tries to separate things into logical units (folders, modules,{" "}
      <Hellip />
      ). These units are usually separated by:
    </P>

    <List>
      <Li>
        Concept
        <List>
          <Li>
            Pages, ui components, business logic, views, <Hellip />
          </Li>
          <Li>
            Home page, login page, register page, <Hellip />
          </Li>
          <Li>
            Controllers, services, mailers, views, <Hellip />
          </Li>
        </List>
      </Li>
      <Li>
        Granularity/Specificity
        <List>
          <Li>
            Specific formatting function used only in one component vs formatting function used in multiple components
            but only in one concept (on most admin pages, but never on product pages) vs general formatting function
            used everywhere.
          </Li>
          <Li>Specific button only used on register page vs General button that is used on all pages.</Li>
          <Li>Specific color transformation used only in header vs general add opacity function used across the app</Li>
        </List>
      </Li>
    </List>

    <H2>Example incorrect specificity</H2>
    <Code language="ts">{`
      // src/styles/colors.ts
      ...

      // src/styles/app-theme.ts
      const addOpacity(color: string, opacity: number): string = () => ...
      const getModalBackground(): string = () => ...
      const getMobileMenuBackground(): string = () => ...
    `}</Code>

    <P>
      Here we had incorrect mixture of specificity. There is general concept of <Italic>colors</Italic> that contains
      colors/functions used everywhere in the app, but there also was more specific concept of{" "}
      <Italic>app-theme</Italic>, that is more specific since it related to app theming and is basically sub concept of
      colors.
    </P>

    <Code language="ts">{`
      // src/styles/theme.ts
      getModalBackground(): string
      getMobileMenuBackground(): string

      // src/styles/colors.ts
      const addOpacity(color: string, opacity: number): string = () => ...
      const getModalBackground(): string = () => ...
      const getMobileMenuBackground(): string = () => ...
    `}</Code>

    {/*

    1. think about place where to put new function/class
      example
        src/styles

        src/theme
          addOpacity(color: string, opacity: number): string
          getMobileBackgroundColor(): string

    2. Public API should not leak internal implementation details
      https://en.wikipedia.org/wiki/Law_of_Demeter

      example
        src/component
          const Component = ({onPressAdditional}) => {
            const {onPress} = useSomeHook()

            return <OtherComponent
              onPress={() => {
                onPress()
                onPressAdditional()
              }}
            />
          }

        src/page
          import Component from './component'

          const Page = () => {
            return <Component onPressAdditional={pressHandler} />
          }

      example 2
        src/password-reset-controller
          was
            class PasswordReset {
              generateJwtToken(jwtClaims: Map<string, string>): string
            }

          should have been
            class PasswordReset {
              generateToken(userId: UserId, passwordHash: string): string
            }

      model types to prevent states that should not be possible
        makeRequest(): Promise<{
          responseData: Data
          responseError: Error
          isLoading: boolean
        }>

        makeRequest(): Promise<
          | { type: "LOADING" }
          | { type: "DONE", data: Data }
          | { type: "ERROR", error: Error }
        }>

        example 2
          type Props = {
            isLoading: boolean,
            title?: string,
            description?: string
          }
          const ScreenComponent = ({isLoading}: Props) => {
            if (isLoading) {
              return <Loading />
            }

            return <>
              <Text>{title}</Text>
              <Text>{description}</Text>
            </>
          }

          const Rounter = (request) => {
            let isLoading = true
            let title = null
            let description = null

            if (request.state === 'DONE') {
              isLoading = false
              title = request.data.title
              description = request.data.title
            }

            return <ScreenComponent isLoading={isLoading} title={title} description={description} />
          }

          how it should have been

          const Router = (request) => {
            if (request.state === 'LOADING') {
              return <ScreenPlaceholder />
            }
            const {title, description} = request.data
            return <ScreenComponent
              title={title}
              description={description}
            />
          }

          type Props = {
            title: string,
            description: string
          }
          const ScreenComponent = ({title, description}: Props) => {
            return <>
              <Text>{title}</Text>
              <Text>{description}</Text>
            </>
          }

        example 3
          type Screen = {
            title: string,
            isProgram: boolean
            isMovie: boolean
            isEpisode: boolean
            canBeRecorded: boolean
            season?: number
            episode?: number
          }

          const ScreenComponent = (props: Props) => {
            return  <Layout>
              <Header>{props.name}</Header>

              {season != null && episode != null && <ProgramInfo season={season} episode={episode} />}

              <Buttons>
                <PlayButton />
                {canBeRecorder && <RecordButton />}
              </Buttons>
            </Layout>
          }

        how it should have been
          type ScreenShared = {
            title: string
          }
          type ScreenMovie = ScreenShared & {
            type: "MOVIE",
            duration: number
          }
          type ScreenEpisode = ScreenShared & {
            type: "EPISODE"
            duration: number
            season: number
            episode: number
          }
          type ScreenProgram = ScreenShared & {
            type: "PROGRAM"
            startData: number
            endDate: number
            canBeRecorder: boolean
          }
          type Screen =
            ScreenMovie
            ScreenEpisode
            SceenProgram

          const ScreenComponent = (props: Props) => {
            return  <Layout>
              <Header>{props.name}</Header>

              {isLive && <Live />}
              {season != null && episode != null && <ProgramInfo season={season} episode={episode} />}

              <Buttons>
                <PlayButton />
                {canBeRecorder && <RecordButton />}
              </Buttons>
            </Layout>
          }
    */}

    {/*

      Another one:

      instead of fixed width on buttons, use min-width or padding.

      I think in general we should not use fixed dimensions for these smaller components - So that when font size or the text itself changes, the component does not break. We can do the same design with more flexible min-width or paddings.
      https://github.com/kaltura/kux-rn/pull/702#pullrequestreview-974083288
    */}
  </>
);
